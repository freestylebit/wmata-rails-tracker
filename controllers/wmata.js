'use strict';

const request = require('request');

const util = require('../util/util.js');

module.exports = {
  // Acquire metadata of all rail stations from WMATA API.
  set_metadata: (db) => {
    let parameters = {
      url: 'https://api.wmata.com/Rail.svc/json/jStations?api_key=' + process.env.WMATA_PRIMARY_KEY
    };

    request(parameters, function (error, response) {
      db.redis.set('wmata_metadata', response.body);
    });
  }
}
