'use strict';

const request = require('request');

const util = require('../util/util.js');

module.exports = {
  // Acquire metadata of all rail stations from WMATA API.
  set_metadata: (db, callback) => {
    let parameters = {
      url: 'https://api.wmata.com/Rail.svc/json/jStations?api_key=' + process.env.WMATA_PRIMARY_KEY
    };
    request(parameters, function (error, response) {
      db.redis.set('wmata_metadata', response.body);

      callback();
    });
  },
  get_stations: (db, code, callback) => {
    let parameters = {
      url: 'https://api.wmata.com/Rail.svc/json/jPath?FromStationCode=C15&ToStationCode=E06&api_key=' + process.env.WMATA_PRIMARY_KEY
    };
    request(parameters, function (error, response) {
      db.redis.set('wmata_line_' + code, response.body);

      callback();
    });
  }
}
