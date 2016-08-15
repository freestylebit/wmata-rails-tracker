const express = require('express');
const React = require('react');
const ReactDOM = require('react-dom/server');

module.exports = (db) => {
  const router = express.Router();

  // Homepage
  router.get('/', (req, res) => {
    db.redis.get('wmata_metadata', (err, reply) => {
      res.status(200).render('index.ejs');
    });
  });

  // Nullify /line requests without parameters.
  router.get('/line', (req, res) => {
    res.status(404).send('Page not found');
  });

  // Track individual line
  router.get('/line/:code', (req, res) => {
    // TODO: Figure out why this is failing istanbul
    // const html = ReactDOM.renderToString(<Track code={req.params.code} />);
    const html = '';

    res.render('line.ejs', {
      html: html,
      container: 'track-status',
      code: req.params.code,
    });
  });

  return router;
};
