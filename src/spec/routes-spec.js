/* eslint-env mocha */

const express = require('express');
const request = require('supertest');
const chai = require('chai');

const db = require('../db.js');

chai.should();

const app = express();
const routes = require('../routes.js')(db);


describe('Application routes', () => {
  before(() => {
    app.use('/', routes);
  });
  it('should detect a valid page at site root.', (done) => {
    request(app)
      .get('/')
      .expect(200, done);
  });
  it('should detect a valid page at root.', (done) => {
    request(app)
      .get('/non-existent-route')
      .expect(404, done);
  });
});
