const mongoose = require('mongoose');

mongoose.connect(
  'mongodb://localhost/products',
  { useNewUrlParser: true }
);

// if (db.ProductInfo) {
//   db.ProuctInfo.dropDatabase();
// }

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('connected to mongoDB'));

let productSchema = mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: String,
  description: String,
  product_price: Number,
  seller: String,
  colors: Array,
});

let ProductInfo = mongoose.model('ProductInfo', productSchema);

const mongoUpdateDatabase = (dataArray) => {
  let failure = false;
  dataArray.forEach(
    ({ id, title, description, product_price, seller, colors }) => {
      let productInfo = new ProductInfo({
        id,
        title,
        description,
        product_price,
        seller,
        colors,
      });
      productInfo.save((err, productInfo) => {
        err
          ? (() => {
              console.log(err);
              failure = true;
            })()
          : null;
      });
    }
  );
  !failure ? console.log('Success!') : null;
};

const mongoQueryDatabase = (id, cb) => {
  // look up row with id and return the data
  ProductInfo.find({ id: id }).exec((err, result) =>
    err ? console.log(err) : cb(result[0])
  );
};

const mongoQueryAllFromDatabase = (cb) => {
  var allProducts = [];
  ProductInfo.find({}, (err, result) => {
    if (err) {
      console.log('TCL: queryAllFromDatabase -> err', err);
    } else {
      result.forEach(({ title, id }) => {
        let obj = {
          title: title,
          id: id,
        };
        allProducts.push(obj);
      });
      cb(allProducts, true);
    }
  });
};

const mongoDeleteFromDatabase = (id) => {
  console.log('DELETE ID', id)
  ProductInfo.remove({id}, function(err) { // TO RESET COLLECTION
    console.log('collection removed')
  });
};

/////////////////////////////////////////////////////////

const {Client} = require('pg');
const client = new Client(
  // user: 'dbuser',
  // host: 'database.server.com',
  // database: 'mydb',
  // password: 'secretpassword',
  // port: 3211,
);


client.connect();

const updateDatabase = (dataArray) => {
  client.query('UPDATE products SET title=$1, description=$2, product_price=$3, seller=$4, colors=$5 WHERE id = $6', dataArray, function (error, results, fields) {
    if (error) throw error;
    //if (cb) {
    //  cb(results);
    //}
  });
};
const addToDatabase = (dataArray) => { // look into bulk insertion. Explore CSV route
  client.query('INSERT INTO products (title, description, product_price, seller, colors) VALUES ($1, $2, $3, $4, $5)', dataArray, function (error, results, fields) {
    if (error) throw console.error(error);
    //if (cb) {
    //  cb(results);
    //}
  });  
};
const queryDatabase = (id, cb) => {
  // look up row with id and return the data
  client.query('SELECT * FROM products WHERE id=$1', [id], function (error, results, fields) {
    if (error) throw error;
    if (cb) {
      cb(results);
    }
  });  
};
const queryAllFromDatabase = (cb) => {
  // look up row with id and return the data
  client.query('SELECT id, title FROM products', function (error, results, fields) {
    if (error) throw error;
    if (cb) {
      cb(results, true);
    }
  });  
};
const deleteFromDatabase = (id, cb) => {
  // look up row with id and return the data
  client.query('DELETE FROM products WHERE id=$1',[id], function (error, results, fields) {
    if (error) throw error;
    if (cb) {
      cb(results);
    }
  });  
};

module.exports= {
  updateDatabase,
  addToDatabase,
  queryDatabase,
  queryAllFromDatabase,
  deleteFromDatabase,
  mongoUpdateDatabase,
  mongoQueryDatabase,
  mongoQueryAllFromDatabase,
  mongoDeleteFromDatabase,
};