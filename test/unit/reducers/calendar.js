import test from 'tape';
import { calendar } from './fixtures.js';
import { genericError } from '../../utils/fixtures.js';
import reducer from '../../../src/js/reducers/calendar.js';


test('Reducer handles GET_CALENDAR_REQUEST as expected', (t) => {

    const action = {
        type: "GET_CALENDAR_REQUEST",
        isFetching: true
    };
    const result = reducer(calendar.initialState, action);

    t.deepEqual(result, calendar.statePostRequest);
    t.end();
});

test('Reducer handles GET_CALENDAR_SUCCESS as expected', (t) => {

    const action = {
        type: "GET_CALENDAR_SUCCESS",
        isFetching: false,
        data: calendar.data
    };
    const result = reducer(calendar.statePostRequest, action);

    t.deepEqual(result, calendar.statePostSuccess);
    t.end();
});

test('Reducer handles GET_CALENDAR_FAILURE as expected', (t) => {

    const action = {
        type: "GET_CALENDAR_FAILURE",
        isFetching: false,
        error: genericError
    };
    const result = reducer(calendar.statePostRequest, action);

    t.deepEqual(result, calendar.statePostFailure);
    t.end();
});
