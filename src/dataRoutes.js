'use strict';

const express = require('express');
const _ = require('lodash');

module.exports = (db) => {
  const router = express.Router();

  // For use with JSON endpoints that have no data.
  const defaultError = { error: 'NO DATA' };

  // Metadata endpoint
  router.get('/', (req, res) => {
    db.redis.get('wmata_metadata', (err, reply) => {
      if (!reply) {
        res.status(400).json(defaultError);
        return;
      }

      res.status(200).json(JSON.parse(reply));
    });
  });

  // Track individual line
  router.get('/line/:code', (req, res) => {
    if (req.params.code.length > 2) {
      res.status(404).json(defaultError);
      return;
    }
    db.redis.get(`wmata_line_${req.params.code}`, (err, reply) => {
      if (!reply) {
        res.status(400).json(defaultError);
        return;
      }

      res.status(200).json(JSON.parse(reply));
    });
  });

  // Parsed data endpoint
  router.get('/track/:code', (req, res) => {
    if (req.params.code.length > 2) {
      res.status(404).json(defaultError);
      return;
    }

    // TODO: Move this to the CRON job and create a cache entry in redis
    // so we're not regenerating this dataset every time we ping the server.
    db.redis.get('wmata_realtime_status', (errorRealtime, reply) => {
      if (!reply) {
        res.status(400).json(defaultError);
        return;
      }

      // Organize realtime data into a format we can use.
      const payload = JSON.parse(reply);
      let statuses = {};

      _.map(payload.Trains, (data) => {
        // Initialize array for data entry.
        if (!statuses[data.LocationCode]) {
          statuses[data.LocationCode] = [];
        }
        statuses[data.LocationCode].push({
          minutes: data.Min,
          direction: data.Group
        });
      });

      // Query the data for this line
      db.redis.get(`wmata_line_${req.params.code}`, (errorLine, lineData) => {
        if (!lineData) {
          res.status(400).json(defaultError);
          return;
        }

        const line = JSON.parse(lineData);
        let sequence = {};

        _.map(line.Path, (data) => {
          // Construct metadata and each station's status
          sequence[data.SeqNum] = {
            name: data.StationName,
            code: data.StationCode
          };

          // Skip if entry doesn't exist.
          if (!statuses[data.StationCode]) {
            return;
          }

          // TODO: Put in something a little more prettier (maybe font-awesome)
          sequence[data.SeqNum].status = '-';
          sequence[data.SeqNum].direction = statuses[data.StationCode][0].direction;
          if (statuses[data.StationCode][0].minutes == 1 ||
              statuses[data.StationCode][0].minutes == 2) {
            sequence[data.SeqNum].status = 'incoming';
          }
          if (statuses[data.StationCode][0].minutes == 'BRD' ||
              statuses[data.StationCode][0].minutes == 'ARR') {
            sequence[data.SeqNum].status = 'boarding';
          }
        });
        res.status(200).json(sequence);
      });
    });
  });

  return router;
};
