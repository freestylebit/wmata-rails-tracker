'use strict';

const express = require('express');
const _ = require('lodash');

module.exports = (db) => {
  const router = express.Router();

  // Metadata endpoint
  router.get('/', (req, res) => {
    db.query('wmata_metadata', (reply) => {
      res.status(200).json(JSON.parse(reply));
    });
  });

  // Track individual line
  router.get('/line/:code', (req, res) => {
    if (req.params.code.length > 2) {
      res.status(404).send('Page not found');
      return;
    }
    db.query(`wmata_line_${req.params.code}`, (reply) => {
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
    db.query('wmata_realtime_status', (payload) => {
      // Organize realtime data into a format we can use.
      let statuses = {};

      _.map(payload.Trains, (data) => {
        // Initialize array for data entry.
        if (!statuses[data.LocationCode]) {
          statuses[data.LocationCode] = [];
        }
        statuses[data.LocationCode].push(data.Min);
      });

      // Query the data for this line
      db.query(`wmata_line_${req.params.code}`, (line) => {
        let sequence = {};

        _.map(line.Path, (data) => {
          // Construct metadata and each station's status
          sequence[data.SeqNum] = {
            name: data.StationName,
            code: data.StationCode,
          };

          // TODO: Put in something a little more prettier (maybe font-awesome)
          sequence[data.SeqNum].status = '-';
          if (_.indexOf(statuses[data.StationCode], '1') > -1 ||
              _.indexOf(statuses[data.StationCode], '2') > -1) {
            sequence[data.SeqNum].status = 'Incoming';
          }
          if (_.indexOf(statuses[data.StationCode], 'BRD') > -1 ||
              _.indexOf(statuses[data.StationCode], 'ARR') > -1) {
            sequence[data.SeqNum].status = 'Boarding';
          }
        });
        res.status(200).json(sequence);
      });
    });
  });

  return router;
};
