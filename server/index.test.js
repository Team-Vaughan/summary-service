var app = require('./index.js');
const supertest = require('supertest');
const request = supertest(app);

test('gets summary for a valid stay ID', async (done) => {
  const response = await request.get('/rooms/109/summary')

  expect(response.status).toBe(200);
  expect(response.body.numBeds).not.toBe(undefined);
  done()
});

test('gets 404 when pinging /summary with an invalid stay ID', async (done) => {
  const response = await request.get('/rooms/90/summary')

  expect(response.status).toBe(404);
  done()
});

