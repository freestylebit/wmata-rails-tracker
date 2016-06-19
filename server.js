"use strict";

const express = require('express'),
      request = require('request'),
   bodyParser = require('body-parser'),
            _ = require('lodash');

const util = require('./util/util.js'),
        db = require('./db.js');

let app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
require('dotenv').config();

// Grabs all valid routes.
app.use('/', require('./routes.js')(db));

// Yields 404 if the user goes to non-existent path.
app.use((req, res, next) => {
  res.status(404).send('Page not found');
  next();
});

app.listen(3000, function () {
  console.log('Go to http://localhost:3000!');
});
