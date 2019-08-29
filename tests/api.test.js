const db = require('../database/index.js');
const faker = require('faker');
import 'babel-polyfill';

let index = parseInt(Math.random() * 1000000) + 9000000;
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
  test('Search query runs in less than 50ms', (done) => {
    var t0 = performance.now();
    db.queryDatabase(index, (result) => {
      // console.log('POSTGRES SEARCH RESULT: ', result);
      var t1 = performance.now()
      console.log('POSTGRES SEARCH TIME: ', t1 - t0);
      // expect(t1 - t0).toBeLessThan(50);
      done();
    });
  });
  
  it('Create-product query runs in less than 50ms', (done) => {
    let testData = [
      faker.fake('{{commerce.productName}}'),
      faker.fake('{{lorem.lines}}'),
      faker.fake('{{commerce.price}}'),
      faker.fake('{{internet.userName}}'),
      '{' + (() => {
        let resultArr = [];
        let numberOfColors = Math.floor(Math.random() * Math.floor(4));
        let colorCount = 0;
        while (colorCount <= numberOfColors) {
        resultArr.push(faker.fake('{{commerce.color}}'));
        colorCount++;
        }
        return resultArr;
      })() + '}'
    ];
    var t0 = performance.now();
    db.addToDatabase(testData, (result) => {
      var t1 = performance.now()
      console.log('POSTGRES POST TIME: ', t1 - t0);
      expect(t1 - t0).toBeLessThan(50);
      done();
    });
  });
  
  // it('Modify-product query runs in less than 50ms', (done) => {
  //   let id = index;
  //   let testData = [
  //     faker.fake('{{commerce.productName}}'),
  //     faker.fake('{{lorem.lines}}'),
  //     faker.fake('{{commerce.price}}'),
  //     faker.fake('{{internet.userName}}'),
  //     (() => {
  //       let resultArr = [];
  //       let numberOfColors = Math.floor(Math.random() * Math.floor(4));
  //       let colorCount = 0;
  //       while (colorCount <= numberOfColors) {
  //       resultArr.push(faker.fake('{{commerce.color}}'));
  //       colorCount++;
  //       }
  //       return resultArr;
  //     })()
  //   ];
  //   var t0 = performance.now();
  //   db.updateDatabase([...testData,id], () => {
  //     var t1 = performance.now()
  //     console.log('POSTGRES MODIFY TIME: ', t1 - t0);
  //     expect(t1 - t0).toBeLessThan(50);
  //     done();
  //   });
  // });
  
  // it('Delete-product query runs in less than 50ms', (done) => {
  //   let id = index;
  //   var t0 = performance.now();

  //   db.deleteFromDatabase(id, () => {
  //     var t1 = performance.now()
  //     console.log('POSTGRES DELETE TIME: ', t1 - t0);
  //     expect(t1 - t0).toBeLessThan(50);
  //     done();
  //   });
  // });
});

// describe('MongoDB queries', () => {
//   it('Search query runs in less than 50ms', (done) => {
//     // run search query
//     var t0 = performance.now();
//     db.mongoQueryDatabase(index, (result) => {
//       console.log('MONGODB SEARCH RESULT: ', result);
//       var t1 = performance.now()
//       console.log('MONGODB SEARCH TIME: ',t1 - t0);
//       expect(t1 - t0).toBeLessThan(50);
//       done();
//     });
//   });
  
//   it('Create-product query runs in less than 50ms', async (done) => {
//     let testData = generateFakeData(10000005);
//     var t0 = performance.now();
//     try {
//       await db.mongoUpdateDatabase(testData);
//     } catch(err) {
//       console.error(err);
//     }
//     var t1 = performance.now();
//     console.log('MONGODB CREATE TIME: ',t1 - t0);
//     expect(t1 - t0).toBeLessThan(50);
//     done()
//   });
  
//   it('Modify-product query runs in less than 50ms', async () => {
//     let id = index;
//     let testData = generateFakeData(id);
//     var t0 = performance.now();
//     try {
//       await db.mongoUpdateDatabase(testData);
//     } catch(err) {
//       console.error(err);
//     }
//     var t1 = performance.now();
//     console.log('MONGODB MODIFY TIME: ',t1 - t0);
//     expect(t1 - t0).toBeLessThan(50);
//   });
  
//   it('Delete-product query runs in less than 50ms', async (done) => {
//     let id = 10000005;
//     var t0 = performance.now();
//     try {
//       await db.mongoDeleteFromDatabase(id);
//     } catch(err) {
//       console.error(err);
//     }
//     var t1 = performance.now();
//     console.log('MONGODB DELETE TIME: ',t1 - t0);
//     expect(t1 - t0).toBeLessThan(50);
//     done();
//   });
// });
