/* eslint-env mocha */
const chai = require('chai');
chai.should();

const util = require('../../src/util/util.js');

describe('Helper function - ', () => {
  describe('Station Endpoints - ', () => {
    it('YL should yield Huntington to Fort Totten.', (done) => {
      const target = util.get_station_endpoints('YL');

      target.start.should.equal('C15');
      target.end.should.equal('E06');
      done();
    });
    it('BL should yield Franconia Springfield to Largo Town Center.', (done) => {
      const target = util.get_station_endpoints('BL');

      target.start.should.equal('J03');
      target.end.should.equal('G05');
      done();
    });
    it('RD should yield Shady Grove to Glenmont.', (done) => {
      const target = util.get_station_endpoints('RD');

      target.start.should.equal('A15');
      target.end.should.equal('B11');
      done();
    });
    it('OR should yield Vienna to New Carrolton.', (done) => {
      const target = util.get_station_endpoints('OR');

      target.start.should.equal('K08');
      target.end.should.equal('D13');
      done();
    });
    it('GR should yield Greenbelt to Branch Ave.', (done) => {
      const target = util.get_station_endpoints('GR');

      target.start.should.equal('F11');
      target.end.should.equal('E10');
      done();
    });
    it('SV should yield Wiehle-Reston East to Largo Town Center.', (done) => {
      const target = util.get_station_endpoints('SV');

      target.start.should.equal('N06');
      target.end.should.equal('G05');
      done();
    });
    it('Invalid line should yield a blank object.', (done) => {
      const target = util.get_station_endpoints('AA');

      target.start.should.equal('');
      target.end.should.equal('');
      done();
    });
  });
});
