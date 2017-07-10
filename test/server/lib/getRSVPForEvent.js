import test from 'tape';
import getRSVPForEvent from '../../../server/lib/getRSVPForEvent.js';
import { SOHIL_ID as userID } from '../../utils/fixtures';
import { eventConfirmedHarryEventID as eventID } from '../../utils/fixtures';

test('getRSVPForEvent returns the correct RSVP status', (t) => {

    getRSVPForEvent(eventID, userID, (error, status) => {

        if (status) {

            t.equal(typeof status, 'string');
        }
        t.equal(status, 'going');
        t.end();
    });
});

test('getRSVPForEvent returns null if no RSVP info found', (t) => {

    getRSVPForEvent('event:400', userID, (error, status) => {

        t.equal(null, status);
        t.end();
    });
});
