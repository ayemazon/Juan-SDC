const updateDatabase = require('../database/index.js').updateDatabase;
const addToDatabase = require('../database/index.js').addToDatabase;
const faker = require('faker');

const _dbSeeder = () => {
  /*
  let fakeInfoArr = [];
  let counter = 0;
  while (counter < 100) {
    fakeInfoArr.push({
      id: counter + 1,
      title: faker.fake('{{commerce.productName}}'),
      description: faker.fake('{{lorem.lines}}'),
      product_price: faker.fake('{{commerce.price}}'),
      seller: faker.fake('{{internet.userName}}'),
      colors: (() => {
        let resultArr = [];
        let numberOfColors = Math.floor(Math.random() * Math.floor(4));
        let colorCount = 0;
        while (colorCount <= numberOfColors) {
          resultArr.push(faker.fake('{{commerce.color}}'));
          colorCount++;
        }
        return resultArr;
      })(),
    });
    counter++;
  }
  */

  let fakeInfoArr = [];
  let counter = 0;
  while (counter < 100) {
    fakeInfoArr.push([
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
    ]);
    counter++;
  }

  // console.log('ARRAY', fakeInfoArr);

  fakeInfoArr.forEach((fakeInfo) => {
    addToDatabase(fakeInfo)
  });
};

_dbSeeder();
