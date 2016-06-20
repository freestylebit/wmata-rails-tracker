const express = require('express');
const React = require('react');
const ReactDOM = require('react-dom/server');

const MyComponent = require('./components/diagram.jsx');

module.exports = (db) => {
  const router = express.Router();

  // Homepage
  router.get('/', (req, res) => {
    db.redis.get('wmata_metadata', (err, reply) => {
      res.status(200).json(JSON.parse(reply));
    });
  });

  // Track individual line
  router.get('/line/:code', (req, res) => {
    if (req.params.code.length > 2) {
      res.status(404).send('Page not found');
      return;
    }
    db.redis.get(`wmata_line_${req.params.code}`, (err, reply) => {
      res.status(200).json(JSON.parse(reply));
    });
  });

  router.get('/derp', (req, res) => {
    // TODO: Figure out why this is failing istanbul
    const html = ReactDOM.renderToString(<MyComponent />);

    res.render('index.ejs', { html: html });
  });

  return router;
};
