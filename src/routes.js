"use strict";

const express = require('express'),
      request = require('request'),
        React = require('react'),
     ReactDOM = require('react-dom/server');

const MyComponent = require('./components/diagram.jsx');

const wmata = require('./controllers/wmata.js');

module.exports = (db) => {
  let router = express.Router();

  // Homepage
  router.get('/', (req, res) => {
    wmata.set_metadata(db, () =>{
      db.redis.get('wmata_metadata', function(err, reply) {
        res.status(200).json(JSON.parse(reply));
      });
    });
  });

  // Track individual line
  router.get('/line/:code', (req, res) => {
    wmata.get_stations_list(db, req.params.code, (done) => {
      if (req.params.code.length > 2) {
        res.status(404).send('Page not found');
        return;
      }
      db.redis.get('wmata_line_' + req.params.code, function(err, reply) {
        res.status(200).json(JSON.parse(reply));
      });
    });
  });

  router.get('/derp', (req, res) => {
    let html = ReactDOM.renderToString(<MyComponent />);

    res.render('index.ejs', {html: html});
  });

  return router;
}
