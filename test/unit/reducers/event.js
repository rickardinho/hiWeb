import test from 'tape';
import reducer from '../../../src/js/reducers/event.js';
import { event as state } from './fixtures.js';
import * as genericFixtures from '../../utils/fixtures.js';

/********
GET EVENT
********/

test('Reducer handles GET_EVENT_REQUEST as expected', (t) => {

    const action = {
        type: "GET_EVENT_REQUEST",
        isFetching: true
    };
    const initialState = state;
    const actual = reducer(initialState, action);

    let expected = initialState;
    expected.isFetching = true;

    t.deepEqual(actual, expected, 'on GET_EVENT_REQUEST, isFetching is `true`');
    t.end();
});

test('Reducer handles GET_EVENT_SUCCESS as expected with isPoll set to true', (t) => {

    let initialState = Object.assign({}, state);
    initialState.isFetching = true;

    let event = genericFixtures.eventPollSohil;

    const data = {
        event: genericFixtures.eventPollSohil,
        poll: {
            eventWhat: [false, true],
            eventWhere: [true, false]
        },
        hasVoted: true
    };
    const action = {
        type: "GET_EVENT_SUCCESS",
        isFetching: false,
        data: data
    };
    const actual = reducer(initialState, action);

    let expected = Object.assign({}, state);

    expected.isFetching = false;
    expected.data = genericFixtures.eventPollSohil;
    expected.poll = data.poll;
    expected.hasVoted = true;

    t.deepEqual(actual, expected, "Event object and poll successfully merged into store");
    t.end();
});

test('Reducer handles GET_EVENT_SUCCESS when with a ConfirmedEvent', (t) => {

    let initialState = Object.assign({}, state);
    initialState.isFetching = true;

    const data = {
        event: genericFixtures.eventConfirmedHarry,
        RSVPs: {
            going: [genericFixtures.HARRY_ID],
            notGoing: [genericFixtures.SOHIL_ID]
        }
    };
    const action = {
        type: "GET_EVENT_SUCCESS",
        isFetching: false,
        data: data
    };
    const actual = reducer(initialState, action);

    let expected = Object.assign({}, initialState);

    expected.isFetching = false;
    expected.data = data.event;
    expected.RSVPs = data.RSVPs;
    expected.hasVoted = undefined;

    t.deepEqual(actual, expected, "Event info and RSVPs successfully merged into store");
    t.end();
});


test('Reducer handles GET_EVENT_FAILURE as expected', (t) => {

    let initialState = state;
    initialState.isFetching = true;
    const error = {
        message: "There was an error..."
    };

    const action = {
        type: "GET_EVENT_FAILURE",
        isFetching: false,
        error: error
    };

    const actual = reducer(initialState, action);

    let expected = initialState;
    expected.isFetching = false;
    expected.error = error;

    t.deepEqual(actual, expected);
    t.end();
});

/********
UPDATE POLL
********/

test('Reducer handles UPDATE_POLL as expected', (t) => {

    let initialState = state;
    initialState.data = genericFixtures.pollToConfirmedEvent;
    initialState.poll = {
        eventWhere: [false, false],
        eventWhen: [false],
    };

    const action = {
        type: 'UPDATE_POLL',
        eventType: 'eventWhere',
        index: 1
    };

    const actual = reducer(initialState, action);

    let expected = initialState;
    expected.poll.eventWhere = [false, true];

    t.deepEqual(actual, expected, 'Poll successfully updates');
    t.end();
});

/********
CONFIRM POLL
********/

test('Reducer handles CONFIRM_POLL_REQUEST as expected', (t) => {

    const initialState = state;

    const action = {
        type: "CONFIRM_POLL_REQUEST",
        isFetching: true
    };

    const actual = reducer(initialState, action);
    let expected = initialState;
    expected.isFetching = true;

    t.deepEqual(actual, expected);
    t.end();
});

test('Reducer handles CONFIRM_POLL_SUCCESS as expected', (t) => {

    let initialState = state;
    initialState.isFetching = true;

    const action = {
        type: "CONFIRM_POLL_SUCCESS",
        isFetching: false
    };

    const actual = reducer(initialState, action);
    let expected = initialState;
    expected.isFetching = false;

    t.deepEqual(actual, expected);
    t.end();
});

test('Reducer handles CONFIRM_POLL_FAILURE as expected', (t) => {

    let initialState = state;
    initialState.isFetching = true;

    const action = {
        type: "CONFIRM_POLL_FAILURE",
        isFetching: false,
        error: genericFixtures.genericError
    };

    const actual = reducer(initialState, action);

    let expected = initialState;
    expected.isFetching = false;
    expected.error = genericFixtures.genericError;

    t.deepEqual(actual, expected);
    t.end();
});

/********
ADD HOST EVENT CHOICE
********/

test('reducer handles ADD_HOST_EVENT_CHOICE as expected', (t) => {

    let initialState = state;
    initialState.hostEventChoices = {
        eventWhat: 0,
        eventWhere: '',
        eventWhen: ''
    };

    const action = {
        type: "ADD_HOST_EVENT_CHOICE",
        eventType: 'eventWhat',
        value: 'Sohil Birthday',
        index: 0
    };

    const actual = reducer(initialState, action);

    let expected = initialState;
    expected.hostEventChoices = {
        eventWhat: 0,
        eventWhere: '',
        eventWhen: ''
    };

    t.deepEqual(actual, expected);

    const initialState2 = expected;

    const action2 = {
        type: "ADD_HOST_EVENT_CHOICE",
        eventType: 'eventWhere',
        value: {
            placeName: "1 Oxford St", placeAddress: "1 Oxford St, London WC1A 1GG, UK"
        },
        index: 0
    };

    const actual2 = reducer(initialState2, action2);
    let expected2 = initialState2;
    expected.hostEventChoices = {
        eventWhat: 0,
        eventWhere: 0,
        eventWhen: ''
    };

    t.deepEqual(actual2, expected2);
    t.end();
});

/********
UPDATE RSVP
********/

test('Reducer handles UPDATE_RSVP_REQUEST as expected', (t) => {

    let initialState = Object.assign({}, state);

    const action = {
        type: "UPDATE_RSVP_REQUEST",
        isFetching: true
    };

    let actual = reducer(initialState, action);

    let expected = initialState;
    initialState.isFetching = true;

    t.deepEqual(actual, expected);
    t.end();
});

test('Reducer handles UPDATE_RSVP_SUCCESS as expected', (t) => {

    let initialState = Object.assign({}, state);

    const action = {
        type: "UPDATE_RSVP_SUCCESS",
        isFetching: false
    };

    let actual = reducer(initialState, action);

    let expected = initialState;
    initialState.isFetching = false;

    t.deepEqual(actual, expected);
    t.end();
});

test('Reducer handles UPDATE_RSVP_FAILURE as expected', (t) => {

    let initialState = Object.assign({}, state);

    const action = {
        type: "UPDATE_RSVP_FAILURE",
        isFetching: false,
        error: genericFixtures.genericError
    };

    let actual = reducer(initialState, action);

    let expected = initialState;
    expected.isFetching = false;
    expected.error = genericFixtures.genericError;

    t.deepEqual(actual, expected);
    t.end();
});

/********
DELETE EVENT
********/

test('Reducer handles DELETE_EVENT_REQUEST as expected', (t) => {

    const action = {
        type: "DELETE_EVENT_REQUEST",
        isFetching: true
    };
    const initialState = state;
    const actual = reducer(initialState, action);

    let expected = initialState;
    expected.isFetching = true;

    t.deepEqual(actual, expected, 'on DELETE_EVENT_REQUEST, isFetching is `true`');
    t.end();
});

test('Reducer handles DELETE_EVENT_SUCCESS as expected', (t) => {

    const action = {
        type: "DELETE_EVENT_SUCCESS",
        isFetching: false
    };
    const initialState = state;
    const actual = reducer(initialState, action);

    let expected = initialState;
    expected.isFetching = false;

    t.deepEqual(actual, expected, 'on DELETE_EVENT_SUCCESS, isFetching is `false`');
    t.end();
});





test('Reducer handles DELETE_EVENT_FAILURE as expected', (t) => {

    let initialState = state;
    initialState.isFetching = true;
    const error = {
        message: "There was an error..."
    };

    const action = {
        type: "DELETE_EVENT_FAILURE",
        isFetching: false,
        error: error
    };

    const actual = reducer(initialState, action);

    let expected = initialState;
    expected.isFetching = false;
    expected.error = error;

    t.deepEqual(actual, expected);
    t.end();
});


/********
UPDATE NOTIFICATIONS
********/

test('Reducer handles UPDATE_NOTIFICATION_REQUEST as expected', (t) => {

    const action = {
        type: "UPDATE_NOTIFICATION_REQUEST",
        updateNotification: true
    };
    const initialState = state;
    const actual = reducer(initialState, action);

    let expected = initialState;
    expected.updateNotification = true;

    t.deepEqual(actual, expected, 'on UPDATE_NOTIFICATION_REQUEST, updateNotification is `true`');
    t.end();
});

test('Reducer handles UPDATE_NOTIFICATION_SUCCESS as expected', (t) => {

    const action = {
        type: "UPDATE_NOTIFICATION_SUCCESS",
        updateNotification: false
    };
    const initialState = state;
    const actual = reducer(initialState, action);

    let expected = initialState;
    expected.updateNotification = false;

    t.deepEqual(actual, expected, 'on UPDATE_NOTIFICATION_SUCCESS, updateNotification is `false`');
    t.end();
});





test('Reducer handles UPDATE_NOTIFICATION_FAILURE as expected', (t) => {

    let initialState = state;
    initialState.isFetching = true;
    const error = {
        message: "There was an error..."
    };

    const action = {
        type: "UPDATE_NOTIFICATION_FAILURE",
        updateNotification: false,
        error: error
    };

    const actual = reducer(initialState, action);

    let expected = initialState;
    expected.updateNotification = false;
    expected.error = error;

    t.deepEqual(actual, expected);
    t.end();
});
