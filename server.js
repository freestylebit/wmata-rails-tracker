"use strict";

const express = require('express'),
      request = require('request'),
   bodyParser = require('body-parser'),
         path = require('path'),
            _ = require('lodash');

const util = require('./src/util/util.js'),
        db = require('./src/db.js');

let app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
require('dotenv').config();
require('node-jsx').install();


// Set view path and templating engine
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');

// Grabs all valid routes.
app.use('/', require('./src/routes.js')(db));

// Yields 404 if the user goes to non-existent path.
app.use((req, res, next) => {
  res.status(404).send('Page not found');
  next();
});

app.listen(3000, function () {
  console.log('Go to http://localhost:3000!');
});
