"use strict";

const express = require('express'),
      request = require('request');

const wmata = require('./controllers/wmata.js');

module.exports = (db) => {
  let router = express.Router();

  // Homepage
  router.get('/', function (req, res) {
    wmata.set_metadata(db);
    db.redis.get('wmata_metadata', function(err, reply) {
      res.status(200).json(JSON.parse(reply));
    });
  });

  return router;
}
