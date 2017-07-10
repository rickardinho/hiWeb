import test from 'tape';
import deleteEventFromUserCalendars from '../../../server/lib/deleteEventFromUserCalendars.js';
import client from '../../../server/db/init.js';
import * as fixtures from '../../utils/fixtures.js';

var users = ['10154129575200996', '12345678'];
var eventID = 'event:600';

test("deleteEventFromUserCalendars deleted the event from users calendar set", (t) => {

    deleteEventFromUserCalendars(users, eventID, (error, response) => {

        client.sismember('calendar:10154129575200996', 'event:600', (error, actual) => {

            t.equal(actual, 0, 'event has been deleted from calendar:10154129575200996');

            client.sismember('calendar:12345678', 'event:600', (error, actual2) => {

                t.equal(actual2, 0, 'event has been deleted from calendar:12345678');
                t.end();
            });
        });
    });
});

test('TEST TEARDOWN deleting the notification sets that are created in event 500 and 600', (t) => {

    client.del("notifications:12345678");
    client.del("notifications:10154129575200996");
    t.end();
});
