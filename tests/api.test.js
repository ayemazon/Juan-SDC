
const db = require('../database/index.js');
const faker = require('faker');
const jest = require('jest');

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

describe('Postgres queries', () => {
  it('Search query runs in less than 50ms', () => {
    // run search query
    var t0 = performance.now();
    db.queryDatabase(9000000, (result) => {
      var t1 = performance.now();
    });
    expect(t1 - t0).toBeLessThan(50);
    // check duration
  });
  
  it('Create-product query runs in less than 50ms', () => {
    
    // run create query
    // check duration
  });
  
  it('Modify-product query runs in less than 50ms', () => {
    // run modify query
    // check duration
  });
  
  it('Delete-product query runs in less than 50ms', () => {
    // run delete query
    // check durations
  });
});

describe('MongoDB queries', () => {
  it('Search query runs in less than 50ms', () => {
    // run search query
    var t0 = performance.now();
    db.mongoQueryDatabase(9000000, (result) => {
      var t1 = performance.now();
    });
    expect(t1 - t0).toBeLessThan(50);
    // check duration
  });
  
  it('Create-product query runs in less than 50ms', () => {
    // run create query
    // check duration
  });
  
  it('Modify-product query runs in less than 50ms', () => {
    // run modify query
    // check duration
  });
  
  it('Delete-product query runs in less than 50ms', () => {
    // run delete query
    // check durations
  });
});
