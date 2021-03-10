const app = require('./index.js');
const supertest = require('supertest');
const request = supertest(app);
require('dotenv');
const {DATABASE_NAME, DATABASE_PORT, DATABASE_TEST_NAME} = require('../config.js');





describe('CRUD operations test suite', () => {
  describe('READ operation', () => {
    test('gets summary for a valid stay ID', async (done) => {
      //process.env.TEST_MODE = true; //so mongo isn't needed for CircleCI
      const response = await request.get('/rooms/109/summary')

      expect(response.status).toBe(200);
      expect(response.body.numBeds).not.toBe(undefined);
      done()
    });

    test('gets 404 when pinging /summary with an invalid stay ID', async (done) => {
      //process.env.TEST_MODE = true; //so mongo isn't used in CircleCI
      const response = await request.get('/rooms/90/summary')

      expect(response.status).toBe(404);
      done()
    });
  })

  describe('CREATE operation', () => {

    test('inserts a valid record into the database', async (done) => {
     const response = await request.post('/rooms/summary')
       .send({
         stayId: 205
       })
       .expect(200);
       done();
    });
  })

})




