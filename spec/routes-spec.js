/*eslint-env mocha */
'use strict';

const express = require('express'),
      request = require('supertest'),
         chai = require('chai');

const db = require('../db.js');

chai.should();

let app = express();


describe('Application routes', () => {
  before(() => {
    let routes = require('../routes.js')(db);
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
