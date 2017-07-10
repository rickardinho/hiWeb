import test from 'tape';
import { HYDRATE_CREATE_EVENT } from '../../../../src/js/actions/create-event.js';
import { hydrateCreateEvent } from '../../../../src/js/actions/create-event.js';
import { eventConfirmedHarry as data } from '../../../utils/fixtures.js';

test('hydrateCreateEvent creates the correct action', (t) => {

    const data = data;
    const expected = {
        type: HYDRATE_CREATE_EVENT,
        data: data,
    };
    const actual = hydrateCreateEvent(data);

    t.deepEqual(actual, expected);
    t.end();
});
