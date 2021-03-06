const request = require('request');

const util = require('../util/util.js');

module.exports = (db) => {
  const redis = db.redis;
    return {
    // Acquire metadata of all rail stations from WMATA API.
    get_metadata: (callback) => {
      const parameters = {
        url: `https://api.wmata.com/Rail.svc/json/jStations?api_key=${process.env.WMATA_PRIMARY_KEY}`,
      };
      request(parameters, (error, response) => {
        if (response && response.body) {
          redis.set('wmata_metadata', response.body);
        }
        callback();
      });
    },
    // Get a list of stations in order for a line.
    // code: RD, BL, YL, OR, GR, SV
    get_stations_list: (code, callback) => {
      const endpoints = util.get_station_endpoints(code);
      const parameters = {
        url: `https://api.wmata.com/Rail.svc/json/jPath?FromStationCode=${endpoints.start}&ToStationCode=${endpoints.end}&api_key=${process.env.WMATA_PRIMARY_KEY}`,
      };
      request(parameters, (error, response) => {
        if (response && response.body) {
          redis.set(`wmata_line_${code}`, response.body);
        }
        callback();
      });
    },
    // Get real time status for a rail station.
    get_stations_status: (callback) => {
      const parameters = {
        url: `https://api.wmata.com/StationPrediction.svc/json/GetPrediction/All?api_key=${process.env.WMATA_PRIMARY_KEY}`,
      };
      request(parameters, (error, response) => {
        if (response && response.body) {
          redis.set('wmata_realtime_status', response.body);
        }
        callback();
      });
    },
  }
};
