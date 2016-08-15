/* eslint-env mocha */

const express = require('express');
const request = require('supertest');
const chai = require('chai');
const bodyParser = require('body-parser');
const redisMock = require('redis-mock');

// Create mock of redis database layer for testing purposes.
const db = {
  redis: redisMock.createClient(),
};
const fakeRedis = redisMock.createClient();

chai.should();

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
require('dotenv').config();
require('node-jsx').install();

// Set views/ directory especially for the following test suites.
app.set('views', __dirname + '/../views');
app.set('view engine', 'ejs');

describe('Application routes', () => {
  before(() => {
    app.use('/', require('../routes.js')(db));
  });
  it('should detect a valid page at site root.', (done) => {
    request(app)
      .get('/')
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(200, done);
  });
  it('should detect an invalid page at root.', (done) => {
    request(app)
      .get('/non-existent-route')
      .expect(404, done);
  });
});



describe('Data routes', () => {
  before(() => {
    app.use('/v1/data', require('../dataRoutes.js')(db));
  })
  it('should detect a valid JSON endpoint (metadata) at /v1/data/.', (done) => {
    request(app)
      .get('/v1/data')
      .expect('Content-Type', /json/)
      .expect(400, {"error":"NO DATA"}, done);
  });
  it('should yield no data at /v1/data/track.', (done) => {
    // Reminder: Redis only accepts strings :).
    request(app)
      .get('/v1/data/track')
      .expect('Content-Type', /json/)
      .expect(404, {"error":"NO DATA"}, done);
  });

  it('should yield valid JSON data when redis key is set at /v1/data/.', (done) => {
    fakeRedis.set('wmata_metadata', JSON.stringify(require('./fixtures/wmata_metadata.json')));

    request(app)
      .get('/v1/data')
      .expect('Content-Type', /json/)
      .expect(200, require('./fixtures/wmata_metadata.json'), done);
  });

  it('should yield red line data at /v1/data/track/RD/.', (done) => {
    fakeRedis.set('wmata_realtime_status', JSON.stringify(require('./fixtures/wmata_realtime_status.json')));
    fakeRedis.set('wmata_line_RD', JSON.stringify(require('./fixtures/wmata_line_RD.json')));

    request(app)
      .get('/v1/data/track/RD/')
      .expect('Content-Type', /json/)
      .expect('Content-Length', '2')
      .expect(200, done);
  });
});