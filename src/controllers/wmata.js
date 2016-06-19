const request = require('request');

const util = require('../util/util.js');

module.exports = {
  // Acquire metadata of all rail stations from WMATA API.
  get_metadata: (db, callback) => {
    const parameters = {
      url: `https://api.wmata.com/Rail.svc/json/jStations?api_key=${process.env.WMATA_PRIMARY_KEY}`,
    };
    request(parameters, (error, response) => {
      db.redis.set('wmata_metadata', response.body);

      callback();
    });
  },
  // Get a list of stations in order for a line.
  // code: RD, BL, YL, OR, GR, SV
  get_stations_list: (db, code, callback) => {
    const endpoints = util.get_station_endpoints(code);
    const parameters = {
      url: `https://api.wmata.com/Rail.svc/json/jPath?FromStationCode=${endpoints.start}&ToStationCode=${endpoints.end}&api_key=${process.env.WMATA_PRIMARY_KEY}`,
    };
    request(parameters, (error, response) => {
      db.redis.set(`wmata_line_${code}`, response.body);

      callback();
    });
  },
  // Get real time status for a rail station.
  get_station_status: (db, code, callback) => {
    const parameters = {
      url: `https://api.wmata.com/StationPrediction.svc/json/GetPrediction/${code}?api_key=${process.env.WMATA_PRIMARY_KEY}`,
    };
    request(parameters, (error, response) => {
      console.log(response.body);
      db.redis.set(`wmata_status_${code}`, response.body);

      callback();
    });
  },
};
