'use strict';

const redis = require('redis');

// Set up available data stores for the app.
module.exports= {
  redis: redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST)
}
