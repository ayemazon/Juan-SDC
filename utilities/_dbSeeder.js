const updateDatabase = require('../database/index.js').updateDatabase;
const addToDatabase = require('../database/index.js').addToDatabase;
const faker = require('faker');


const generateFakeData = (i) => {
  return [{
    id: i + 1,
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
    }];
};

const _dbSeeder = (i) => {
  let counter = 0;
  while (counter < 500000) {
      addToDatabase(generateFakeData());
    counter++;
    if (counter % 10000 === 0) {
      console.log('Count at: ', counter);
    }
  }
  console.log("Seeding Done");
};
 _dbSeeder();

