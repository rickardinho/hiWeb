import test from 'tape';
import mapCalendarToRSVPs from '../../../server/lib/mapCalendarToRSVPs.js';
import { SOHIL_ID as userID } from '../../utils/fixtures';
import { eventConfirmedHarryCalendar as calendar } from '../../utils/fixtures';


test('mapCalendarToRSVPs returns the correct attendance status', (t) => {

    mapCalendarToRSVPs([calendar, calendar], userID, (error, result) => {

        result.forEach((item, i) => {

            t.ok(item.hasOwnProperty('RSVP'), `An RSVP key exists in calendar item #${i}`);
            t.equal(item.RSVP, 'going', `Correct attendance status returned`);
        });
        t.end();
    });
});

test('mapCalendarToRSVPs handles an empty array', (t) => {

    mapCalendarToRSVPs([], userID, (error, result) => {

        t.ok(Array.isArray(result), 'Returns an array');
        t.equal(result.length, 0, 'Returns an empty array');
        t.end();
    });
});
