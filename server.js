"use strict";

const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const path = require('path');
const _ = require('lodash');
const async = require('async');
const cron = require('node-cron');
const winston = require('winston');

const util = require('./src/util/util.js');
const db = require('./src/db.js');
const wmata = require('./src/controllers/wmata.js')(db);

let app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
require('dotenv').config();
require('node-jsx').install();


// Set view path and templating engine
app.set('views', __dirname + '/src/views');
app.set('view engine', 'ejs');

// Tap into physical directory for webpack assets
app.use(express.static(__dirname + '/dist'));

// Grabs all valid routes.
app.use('/', require('./src/routes.js')(db));
app.use('/v1/data', require('./src/dataRoutes.js')(db));

// Yields 404 if the user goes to non-existent path.
app.use((req, res, next) => {
  res.status(404).send('Page not found');
  next();
});

// Do an initial poll of WMATA's API prior to running any endpoints.
query_wmata();

// Kickstart the server!
app.listen(3000, () => {
  winston.info('Go to http://localhost:3000!');
});



// Poll the WMATA for new data every minute.
cron.schedule('*/15 * * * * *', () => {
  //query_wmata();
});

// Helper functions
// TODO: Move this somewhere else.
function query_wmata() {
  wmata.get_metadata(() => {
    winston.info('WMATA metadata acquired');
  });

  // WMATA has set a one request per second limit on their API.
  // The delays are set to somewhat circumvent this restriction.
  let delay = 0;
  let task;
  // TODO: Refactor this to properly use callbacks.
  _.map(['RD', 'BL', 'YL', 'OR', 'GR', 'SV'], (line) => {
    task = setTimeout(() => {
      wmata.get_stations_list(line, () => {
        winston.info(`WMATA station list for ${line} acquired`);
      });
    }, delay);
    clearInterval(task);
    delay += 2000;
  });

  wmata.get_stations_status(() => {
    winston.info('WMATA real time predictions acquired');
  })
}