import test from 'tape';
import getEventPhotos from '../../../server/db/getEventPhotos.js';
import client from '../../../server/db/init.js';
import { eventConfirmedHarryPhotos as expected } from '../../utils/initDB.js';

test('getEventPhotos returns the correct data', (t) => {

    var eventID = "event:100";
    getEventPhotos(eventID, (error, response) => {

        t.ok(typeof response[0] === 'object', "returned data is parsed from getEventPhotos");
        t.equal(response[1], expected, "Correct photo returned");
        t.end();
    });
});

test('teardown for getEventPhotos Test', (t) => {

    client.del("photos:event:100");
    t.end();

});
