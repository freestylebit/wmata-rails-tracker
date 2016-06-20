const express = require('express');
const React = require('react');
const ReactDOM = require('react-dom/server');
const _ = require('lodash');

module.exports = (db) => {
  const router = express.Router();

  // Metadata endpoint
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

  // Yields all real-time data
  router.get('/realtime', (req, res) => {
    // TODO: Move this to the CRON job and create a cache entry in redis
    // so we're not regenerating this dataset every time we ping the server.
    db.redis.get('wmata_realtime_status', (err, reply) => {
      // Organize the real time data into a format we can use.
      const payload = JSON.parse(reply);
      let statuses = {};

      _.map(payload.Trains, (data) => {
        if (!statuses[data.LocationCode]) {
          // Initialize array for data entry.
          statuses[data.LocationCode] = [];
        }
        statuses[data.LocationCode].push(data.Min);
      });
      res.status(200).json(statuses);
    });
  });

  // Parsed data endpoint
  router.get('/track/:code', (req, res) => {
    if (req.params.code.length > 2) {
      res.status(404).send('Page not found');
      return;
    }
    db.redis.get(`wmata_line_${req.params.code}`, (err, reply) => {
      res.status(200).json(JSON.parse(reply));
    });
  });

  return router;
};
