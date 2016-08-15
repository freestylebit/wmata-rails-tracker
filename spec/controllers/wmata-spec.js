/* eslint-env mocha */
const redisMock = require('redis-mock');
const chai = require('chai');
chai.should();

const db = {
  redis: redisMock.createClient(),
};
const fakeRedis = redisMock.createClient();
const wmata = require('../../src/controllers/wmata.js')(db);

describe('WMATA Controllers - ', () => {
  it('Method get_metadata() should acquire rail metadata.', (done) => {
    wmata.get_metadata(() => {
      db.redis.get(`wmata_metadata`, (err, reply) => {
        expect(reply).to.match(/StationTogether1/);
        done();
      });
    });
  });
  it('Method get_stations_list() should acquire rail metadata.', (done) => {
    wmata.get_stations_list('RD', () => {
      db.redis.get(`wmata_line_RD`, (err, reply) => {
        expect(reply).to.match(/DistanceToPrev/);
        done();
      });
    });
  });
  it('Method get_stations_status() should acquire rail metadata.', (done) => {
    wmata.get_stations_status(() => {
      db.redis.get(`wmata_realtime_status`, (err, reply) => {
        expect(reply).to.match(/DestinationName/);
        expect(reply).to.match(/Min/);
        done();
      });
    });
  });
});
