/* eslint-env mocha */

const express = require('express');
const request = require('supertest');
const chai = require('chai');
const redisMock = require('redis-mock');

// Create mock of redis database layer for testing purposes.
const db = {
  redis: redisMock.createClient(),
};

chai.should();

const app = express();

// Set views/ directory especially for the following test suites.
app.set('views', __dirname + '/../views');
app.set('view engine', 'ejs');


describe('Application routes', () => {
  before(() => {
    const routes = require('../routes.js')(db);
    app.use('/', routes);
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
    const dataRoutes = require('../dataRoutes.js')(db);
    app.use('/v1/data', dataRoutes);
  });
  it('should detect a valid JSON endpoint (metadata) at /v1/data/.', (done) => {
    request(app)
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});