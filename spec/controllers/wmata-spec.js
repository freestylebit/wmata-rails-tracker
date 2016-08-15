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
      let value = db.redis.get('wmata_metadata');
      done();
    });
  });
  it('Method get_stations_list() should acquire rail metadata.', (done) => {
    wmata.get_stations_list('RD', () => {
      let value = db.redis.get('wmata_line_RD');
      done();
    });
  });
  it('Method get_stations_status() should acquire rail metadata.', (done) => {
    wmata.get_stations_status(() => {
      let value = db.redis.get('wmata_realtime_status');
      done();
    });
  });
});
