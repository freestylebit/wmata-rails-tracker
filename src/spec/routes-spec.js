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
});