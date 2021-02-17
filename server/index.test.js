var app = require('./index.js');
const supertest = require('supertest');
const request = supertest(app);
require('dotenv');




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

