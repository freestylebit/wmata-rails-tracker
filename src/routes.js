const express = require('express');
const React = require('react');
const ReactDOM = require('react-dom/server');

const Track = require('./components/track.jsx');

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
    // TODO: Figure out why this is failing istanbul
    const html = ReactDOM.renderToString(<Track code={req.params.code} />);

    res.render('index.ejs', {
      html: html, code: req.params.code
    });
  });

  return router;
};
