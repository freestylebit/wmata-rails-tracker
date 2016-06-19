/*eslint-env mocha */
'use strict';
const chai = require('chai');
chai.should();

const util = require('../../util/util.js');

describe('Helper function - ', () => {
  describe('Station Endpoints - ', () => {
    it('YL should yield Huntington to Fort Totten.', (done) => {
      let target = util.get_station_endpoints('YL');

      target.start.should.equal('E06');
      target.end.should.equal('C15');
      done();
    });
    it('BL should yield Franconia Springfield to Largo Town Center.', (done) => {
      let target = util.get_station_endpoints('BL');

      target.start.should.equal('J03');
      target.end.should.equal('G05');
      done();
    });
    it('RD should yield Shady Grove to Glenmont.', (done) => {
      let target = util.get_station_endpoints('RD');

      target.start.should.equal('A15');
      target.end.should.equal('B11');
      done();
    });
    it('OR should yield Vienna to New Carrolton.', (done) => {
      let target = util.get_station_endpoints('OR');

      target.start.should.equal('K08');
      target.end.should.equal('D13');
      done();
    });
    it('GR should yield Greenbelt to Branch Ave.', (done) => {
      let target = util.get_station_endpoints('GR');

      target.start.should.equal('E10');
      target.end.should.equal('F11');
      done();
    });
    it('SV should yield Wiehle-Reston East to Largo Town Center.', (done) => {
      let target = util.get_station_endpoints('SV');

      target.start.should.equal('N06');
      target.end.should.equal('G05');
      done();
    });
  });
});
