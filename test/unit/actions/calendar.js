import test from 'tape';
import { GET_CALENDAR, GET_CALENDAR_REQUEST, GET_CALENDAR_SUCCESS, GET_CALENDAR_FAILURE } from '../../../src/js/actions/calendar.js';
import { getCalendar, getCalendarRequest, getCalendarSuccess, getCalendarFailure, updatePoll } from '../../../src/js/actions/calendar.js';
import createThunk from '../../utils/mock-thunk.js';

test('getCalendar async action creator returns expected action', (t) => {

    let actual;
    const { dispatch, queue } = createThunk();
    dispatch(getCalendar());

    [{...actual}] = queue;

    const expected = {
        type: GET_CALENDAR_REQUEST,
        isFetching: true
    };

    t.deepEqual(actual, expected, "getCalendar returns GET_CALENDAR_REQUEST action");
    t.end();
});

test('getCalendarRequest action creator returns expected action', (t) => {

    const expected = {
        type: GET_CALENDAR_REQUEST,
        isFetching: true
    };
    const actual = getCalendarRequest();

    t.deepEqual(actual, expected);
    t.end();
});

test('getCalendarSuccess action creator returns expected action', (t) => {

    const data = [

    ];
    const expected = {
        type: GET_CALENDAR_SUCCESS,
        data,
        isFetching: false
    };

    const actual = getCalendarSuccess(data);

    t.deepEqual(actual, expected);
    t.end();
});

test('getCalendarFailure action creator returns expected action', (t) => {

    const error = {
        message: "Whoops"
    };
    const expected = {
        type: GET_CALENDAR_FAILURE,
        isFetching: false,
        error
    };

    const actual = getCalendarFailure(error);

    t.deepEqual(actual, expected);
    t.end();
});
