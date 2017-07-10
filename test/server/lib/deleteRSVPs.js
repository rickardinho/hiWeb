import test from 'tape';
import deleteRSVPs from '../../../server/lib/deleteRSVPs.js';
import client from '../../../server/db/init.js';
import * as fixtures from '../../utils/fixtures.js';

var eventID = 'event:600';

test("deleteRSVPs deletes all the status sets for the given event", (t) => {

    deleteRSVPs(eventID, (error, response) => {

        client.exists('RSVP:event:600|going', (error, actual) => {

            t.equal(actual, 0, 'event has been deleted from calendar:10154129575200996');

            client.sismember('calendar:12345678', 'event:600', (error, actual2) => {

                t.equal(actual2, 0, 'event has been deleted from calendar:12345678');
                t.end();
            });
        });
    });
});
