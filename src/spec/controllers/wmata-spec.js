/* eslint-env mocha */
const redisMock = require('redis-mock');
const chai = require('chai');
chai.should();

const db = {
  redis: redisMock.createClient(),
};
const fakeRedis = redisMock.createClient();
const wmata = require('../../controllers/wmata.js')(db);

function test() {
  console.log('asdf');
}

describe('WMATA Controllers - ', () => {
  it('Method get_metadata() should acquire rail metadata.', (done) => {
    wmata.get_metadata(db);

    let value = fakeRedis.get('wmata_metadata');
    console.log(value);
    done();
  });
  it('Method get_stations_list() should acquire rail metadata.', (done) => {
    wmata.get_stations_list(db);

    let value = fakeRedis.get('wmata_metadata');
    console.log(value);
    done();
  });
  it('Method get_stations_status() should acquire rail metadata.', (done) => {
    wmata.get_stations_status(db);

    let value = fakeRedis.get('wmata_metadata');
    console.log(value);
    done();
  });
});
