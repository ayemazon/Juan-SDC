const express = require('express');
const queryDatabase = require('../database/index.js').queryDatabase;
const queryAllFromDatabase = require('../database/index.js')
  .queryAllFromDatabase;
const deleteFromDatabase = require('../database/index.js')
  .deleteFromDatabase;
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());

app.use(express.static(__dirname + '/../client/dist'));

app.use('/products/:id', express.static(__dirname + '/../client/dist'));

app.get('/product/:id', (req, res) => {
  console.log('GETTING PRODUCT');
  queryDatabase(req.params.id, (result) => {
    res.send(result);
  });
});

app.get('/getallproducts', (req, res) => {
  queryAllFromDatabase((result, successBool) => {
    // console.log('GETALL', result.rows);
    res.send(result.rows);
    // res.send(result.concat({ title: `Passed: ${successBool}`, id: 01 }));
  });
});

app.post('/updateproduct', (req, res) => {
  updateDatabase(req.body); //req.body needs to be a data array
  // can return or can make a separate get request (the former is probably faster)
});

app.put('/updateproduct', (req, res) => {
  updateDatabase(req.body); //req.body needs to be a data array
  // can return or can make a separate get request (the former is probably faster)
});

app.delete('/updateproduct', (req, res) => {
  console.log('REQUEST', req.query.id);
  deleteFromDatabase(req.query.id); //req.body is the removing ID
});

app.listen(port, () =>
  console.log(`App connection successful! App hosted at port: ${port}`)
);
