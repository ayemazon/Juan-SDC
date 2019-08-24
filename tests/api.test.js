
const db = require('../database/index.js');
const faker = require('faker');
import 'babel-polyfill';

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

describe('Postgres queries', async () => {
  it('Search query runs in less than 50ms', async () => {
    var t0 = performance.now();
    await db.queryDatabase(9900000, (result) => {});
    var t1 = performance.now();
    expect(t1 - t0).toBeLessThan(50);
  });
  
  it('Create-product query runs in less than 50ms', async() => {
    let testData = [
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
      })()
    ];
    var t0 = performance.now();
    await db.addToDatabase(testData);
    var t1 = performance.now();
    expect(t1 - t0).toBeLessThan(50);
  });
  
  it('Modify-product query runs in less than 50ms', async () => {
    let id = 9900000;
    let testData = generateFakeData(id);
    var t0 = performance.now();
    await db.updateDatabase(testData);
    var t1 = performance.now();
    expect(t1 - t0).toBeLessThan(50);
  });
  
  it('Delete-product query runs in less than 50ms', async () => {
    let id = 9900000;
    var t0 = performance.now();
    await db.deleteFromDatabase(id);
    var t1 = performance.now();
    expect(t1 - t0).toBeLessThan(50);
  });
});

describe('MongoDB queries', () => {
  it('Search query runs in less than 50ms', async () => {
    // run search query
    var t0 = performance.now();
    await db.mongoQueryDatabase(9900000, (result) => {});
    var t1 = performance.now();
    expect(t1 - t0).toBeLessThan(50);
    // check duration
  });
  
  it('Create-product query runs in less than 50ms', async() => {
    let testData = generateFakeData(10000003);
    var t0 = performance.now();
    await db.mongoUpdateDatabase(testData);
    var t1 = performance.now();
    expect(t1 - t0).toBeLessThan(50);
  });
  
  it('Modify-product query runs in less than 50ms', async () => {
    let id = 9900000;
    let testData = generateFakeData(id);
    var t0 = performance.now();
    await db.mongoUpdateDatabase(testData);
    var t1 = performance.now();
    expect(t1 - t0).toBeLessThan(50);
  });
  
  it('Delete-product query runs in less than 50ms', async () => {
    let id = 10000003;
    var t0 = performance.now();
    await db.mongoDeleteFromDatabase(id);
    var t1 = performance.now();
    expect(t1 - t0).toBeLessThan(50);
  });
});
