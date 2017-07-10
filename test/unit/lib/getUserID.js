import test from 'tape';
import getUserID from '../../../src/js/lib/getUserID.js';

test('getUserID returns the user\'s ID from the cookie', (t) => {

    const actual = getUserID();
    const expected = '12345678';

    t.equal(actual.toString(), expected, 'The user ID number is extracted from cookie');
    t.end();
});
