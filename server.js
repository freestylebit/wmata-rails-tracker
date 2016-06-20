"use strict";

const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const path = require('path');
const _ = require('lodash');
const async = require('async');
const cron = require('node-cron');

const util = require('./src/util/util.js');
const db = require('./src/db.js');
const wmata = require('./src/controllers/wmata.js');

let app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
require('dotenv').config();
require('node-jsx').install();


// Set view path and templating engine
app.set('views', path.join(__dirname, 'src/views'));
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


app.listen(3000, () => {
  console.log('Go to http://localhost:3000!');
});

// Poll the WMATA for new data every minute.
// cron.schedule('* * * * *', () => {
//   wmata.get_metadata(db, () => {
//     console.log('WMATA metadata acquired');
//   });

//   // WMATA has set a one request per second limit on their API.
//   // The delays are set to somewhat circumvent this restriction.
//   let delay = 0;
//   let task;
//   // TODO: Refactor this to properly use callbacks.
//   _.map(['RD', 'BL', 'YL', 'OR', 'GR', 'SV'], (line) => {
//     task = setTimeout(() => {
//       console.log(`WMATA station list for ${line} acquired`);
//     }, delay);
//     clearInterval(task);
//     delay += 2000;
//   });

//   wmata.get_stations_status(db, () => {
//     console.log('WMATA real time predictions acquired');
//   })
// });
