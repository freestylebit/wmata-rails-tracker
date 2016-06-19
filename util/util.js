'use strict';
const React = require('react'),
   ReactDOM = require('react-dom/server');

module.exports = {
  // code: RD, BL, YL, OR, GR, SV
  get_station_endpoints(code) {
    /// @TODO: Un-hardcode this.
    let endpoints;
    switch(code) {
      case 'YL':
        // Swap it around and API only sends data for 6 green line stations...
        // ...for some reason...
        endpoints = {
          'start': 'C15',
          'end': 'E06'
        };
        break;
      case 'BL':
        endpoints = {
          'start': 'J03',
          'end': 'G05'
        };
        break;
      case 'RD':
        endpoints = {
          'start': 'A15',
          'end': 'B11'
        };
        break;
      case 'OR':
        endpoints = {
          'start': 'K08',
          'end': 'D13'
        };
        break;
      case 'GR':
        endpoints = {
          'start': 'F11',
          'end': 'E10'
        };
        break;
      case 'SV':
        endpoints = {
          'start': 'N06',
          'end': 'G05'
        };
        break;
    }
    return endpoints;
  }
}
