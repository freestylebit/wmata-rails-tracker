'use strict';

const request = require('request');
const redis = require('redis');

const util = require('../util/util.js');

const connection = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);

module.exports = {
  // Instantiate connection to redis.

  // Acquire metadata of all rail stations from WMATA API.
  query: (key, callback) => {
    let results;
    connection.get(key, (err, reply) => {
      // As a convenience (and to not hold up the server),
      // fire an error if there is no data here...
      if (!reply) {
        reply = { error: 'NO DATA' };
      }

      callback(reply);
    });
  },
  // Assign a string to a key.
  set: (key, data, callback) => {
    connection.set(key, data);

    callback();
  },
};
