import test from 'tape';
import saveNewEvent from '../../../server/db/saveNewEvent.js';
import parseObjectValues from '../../../server/lib/parseObjectValues.js';
import client from '../../../server/db/init.js';
import * as fixtures from '../../utils/fixtures.js';

test('saveNewEvent saves a new event', (t) => {

    const data = fixtures.eventConfirmedHarry;
    let expected = data;

    saveNewEvent(data, (error, eventID) => {

        expected.eventID = eventID;

        client.hgetall(eventID, (error, result) => {

            t.deepEqual(parseObjectValues(result), expected, 'New event is saved');
            Object.keys(expected).forEach((key) => {

                t.ok(result.hasOwnProperty(key), `'${key}' key exists in event object`);
            });
            client.del(eventID);
            t.end();
        });
    });
});
