const faker = require('faker');
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const csvWriter = createCsvWriter({
  path: __dirname + '/seed.csv',
  header: [
//   {id: 'id', title: 'id'},
  {id: 'title', title: 'title'},
  {id: 'description', title: 'description'},
  {id: 'product_price', title: 'product_price'},
  {id: 'seller', title: 'seller'},
  {id: 'colors', title: 'colors'}
  ]
});

const writeCsv = async () => {
  for (var i = 0; i < 10000000; i++) {
    await csvWriter
    .writeRecords([{
    // id: i + 1,
    title: faker.fake('{{commerce.productName}}'),
    description: faker.fake('{{lorem.lines}}'),
    product_price: faker.fake('{{commerce.price}}'),
    seller: faker.fake('{{internet.userName}}'),
    colors: '{' + (() => {
      let resultArr = [];
      let numberOfColors = Math.floor(Math.random() * Math.floor(4));
      let colorCount = 0;
      while (colorCount <= numberOfColors) {
      resultArr.push(faker.fake('{{commerce.color}}'));
      colorCount++;
      }
      return resultArr;
    })() + '}',
    }], (err, dataToWrite) => {
    console.log('Added',dataToWrite, 'to CSV')
    });  
    if (i % 10000 === 0) console.log('Reached ', i, '!');
  }
};
writeCsv();    
/*
const putInCsv = async (dataToWrite, cb) => {
  await fs.writeFile(__dirname + '/seed.csv', dataToWrite, 'utf8',async err => {
    if (err) console.error(err);
    await cb(err, dataToWrite);
  });
}

const createCsv = async () => {
  for (var i = 0; i < 1; i++) {
    await putInCsv([
    faker.fake('{{commerce.productName}}'),
    faker.fake('{{lorem.lines}}'),
    faker.fake('{{commerce.price}}'),
    faker.fake('{{internet.userName}}'),
    (() => {
        let resultArr = [];
        let numberOfColors = Math.floor(Math.random() * Math.floor(4));
        let colorCount = 0;
        while (colorCount <= numberOfColors) {
        resultArr.push(faker.fake('{{commerce.color}}'));
        colorCount++;
        }
        return resultArr;
    })(),
    ], (err, dataToWrite) => {
      console.log('Added',dataToWrite, 'to CSV')
    });  
  }
}
createCsv();
*/