'use strict';

module.exports = {
  // code: RD, BL, YL, OR, GR, SV
  get_station_endpoints(code) {
    /// @TODO: Un-hardcode this.
    let endpoints;
    switch(code) {
      case 'YL':
        endpoints = {
          'start': 'E06',
          'end': 'C15'
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
          'start': 'E10',
          'end': 'F11'
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
