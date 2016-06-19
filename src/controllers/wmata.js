'use strict';

const request = require('request');

const util = require('../util/util.js');

const basePath = 'https://api.wmata.com/';

module.exports = {
  // Acquire metadata of all rail stations from WMATA API.
  set_metadata: (db, callback) => {
    let parameters = {
      url: basePath + 'Rail.svc/json/jStations?api_key=' + process.env.WMATA_PRIMARY_KEY
    };
    request(parameters, function (error, response) {
      db.redis.set('wmata_metadata', response.body);

      callback();
    });
  },
  // Get a list of stations in order for a line.
  // code: RD, BL, YL, OR, GR, SV
  get_stations_list: (db, code, callback) => {
    let endpoints = util.get_station_endpoints(code);
    let parameters = {
      url: basePath + 'Rail.svc/json/jPath?FromStationCode=' + endpoints.start + '&ToStationCode=' + endpoints.start + '&api_key=' + process.env.WMATA_PRIMARY_KEY
    };
    request(parameters, function (error, response) {
      db.redis.set('wmata_line_' + code, response.body);

      callback();
    });
  },
  // Get real time status for a rail station.
  get_station_status: (db, code, callback) => {
    let parameters = {
      url: basePath + 'StationPrediction.svc/json/GetPrediction/' + code + '&api_key=' + process.env.WMATA_PRIMARY_KEY
    };
    request(parameters, function (error, response) {
      db.redis.set('wmata_line_' + code, response.body);

      callback();
    });
  }
}
