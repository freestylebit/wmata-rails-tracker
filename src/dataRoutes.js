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

  // Parsed data endpoint
  router.get('/track/:code', (req, res) => {
    if (req.params.code.length > 2) {
      res.status(404).send('Page not found');
      return;
    }

    // TODO: Move this to the CRON job and create a cache entry in redis
    // so we're not regenerating this dataset every time we ping the server.
    db.redis.get('wmata_realtime_status', (err, reply) => {
      // Organize realtime data into a format we can use.
      const payload = JSON.parse(reply);
      let statuses = {};

      _.map(payload.Trains, (data) => {
        // Initialize array for data entry.
        if (!statuses[data.LocationCode]) {
          statuses[data.LocationCode] = [];
        }
        statuses[data.LocationCode].push(data.Min);
      });

      // Query the data for this line
      db.redis.get(`wmata_line_${req.params.code}`, (err, reply) => {
        const line = JSON.parse(reply);
        let sequence = {}

        _.map(line.Path, (data) => {
          // Construct metadata and each station's status
          sequence[data.StationCode] = {
            name: data.StationName
          }

          sequence[data.StationCode].status = 0;
          if (statuses[data.StationCode]) {
            if (_.indexOf(statuses[data.StationCode], '1') > -1 || _.indexOf(statuses[data.StationCode], '2') > -1) {
              sequence[data.StationCode].status = 1;
            }
            if (_.indexOf(statuses[data.StationCode], 'BRD') > -1 || _.indexOf(statuses[data.StationCode], 'ARR') > -1) {
              sequence[data.StationCode].status = 2;
            }
          }
        });
        res.status(200).json(sequence);
      });
    });

  });

  return router;
};