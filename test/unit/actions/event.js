import test from 'tape';
import { GET_EVENT, GET_EVENT_REQUEST, GET_EVENT_SUCCESS, GET_EVENT_FAILURE, UPDATE_POLL } from '../../../src/js/actions/event.js';
import { getEvent, getEventRequest, getEventSuccess, getEventFailure, updatePoll } from '../../../src/js/actions/event.js';

import { CONFIRM_POLL, CONFIRM_POLL_REQUEST, CONFIRM_POLL_SUCCESS, CONFIRM_POLL_FAILURE } from '../../../src/js/actions/event.js';
import { confirmPoll, confirmPollRequest, confirmPollSuccess, confirmPollFailure } from '../../../src/js/actions/event.js';

import { ADD_HOST_EVENT_CHOICE } from '../../../src/js/actions/event.js';
import { addHostEventChoice } from '../../../src/js/actions/event.js';

import { CONFIRM_EVENT, CONFIRM_EVENT_REQUEST, CONFIRM_EVENT_SUCCESS, CONFIRM_EVENT_FAILURE } from '../../../src/js/actions/event.js';
import { confirmEvent, confirmEventRequest, confirmEventSuccess, confirmEventFailure } from '../../../src/js/actions/event.js';

import { UPDATE_RSVP, UPDATE_RSVP_REQUEST, UPDATE_RSVP_SUCCESS, UPDATE_RSVP_FAILURE } from '../../../src/js/actions/event.js';
import { updateRSVP, updateRSVPRequest, updateRSVPSuccess, updateRSVPFailure } from '../../../src/js/actions/event.js';

import { DELETE_EVENT, DELETE_EVENT_REQUEST, DELETE_EVENT_SUCCESS, DELETE_EVENT_FAILURE } from '../../../src/js/actions/event.js';
import { deleteEvent, deleteEventRequest, deleteEventSuccess, deleteEventFailure } from '../../../src/js/actions/event.js';

import { SAVE_EDITED_EVENT, SAVE_EDITED_EVENT_REQUEST, SAVE_EDITED_EVENT_SUCCESS, SAVE_EDITED_EVENT_FAILURE } from '../../../src/js/actions/event.js';
import { saveEditedEvent, saveEditedEventRequest, saveEditedEventSuccess, saveEditedEventFailure } from '../../../src/js/actions/event.js';

import { UPDATE_NOTIFICATION, UPDATE_NOTIFICATION_REQUEST, UPDATE_NOTIFICATION_SUCCESS, UPDATE_NOTIFICATION_FAILURE } from '../../../src/js/actions/event.js';
import { updateNotification, updateNotificationRequest, updateNotificationSuccess, updateNotificationFailure } from '../../../src/js/actions/event.js';


import createThunk from '../../utils/mock-thunk.js';

import { event as eventFixtures } from './fixtures.js';
import * as genericFixtures from '../../utils/fixtures.js';

/********
GET EVENT ACTIONS
********/

test('getEvent async action creator returns expected action', (t) => {

    let actual;
    const { dispatch, queue } = createThunk();
    let eventID = 'event:100';
    dispatch(getEvent(eventID));

    [{ ...actual }] = queue;

    const expected = {
        type: GET_EVENT_REQUEST,
        isFetching: true
    };

    t.deepEqual(actual, expected, "getEvent returns GET_EVENT_REQUEST action");
    t.end();
});

test('getEventRequest action creator returns expected action', (t) => {

    const expected = {
        type: GET_EVENT_REQUEST,
        isFetching: true
    };
    const actual = getEventRequest();

    t.deepEqual(actual, expected);
    t.end();
});

test('getEventSuccess action creator returns expected action', (t) => {

    const data = {
        eventName: "sohil",
        eventDescription: "Birthday"
    };
    const expected = {
        type: GET_EVENT_SUCCESS,
        data,
        isFetching: false
    };

    const actual = getEventSuccess(data);

    t.deepEqual(actual, expected);
    t.end();
});

test('getEventFailure action creator returns expected action', (t) => {

    const error = {
        message: "Whoops"
    };
    const expected = {
        type: GET_EVENT_FAILURE,
        isFetching: false,
        error
    };

    const actual = getEventFailure(error);

    t.deepEqual(actual, expected);
    t.end();
});

/********
UPDATE POLL ACTIONS
********/

test('updatePoll action creator returns expected action', (t) => {

    const expected = {
        type: UPDATE_POLL,
        eventType: "eventWhen",
        index: 2
    };

    const actual = updatePoll("eventWhen", 2);

    t.deepEqual(actual, expected);
    t.end();
});

/********
CONFIRM POLL ACTIONS
********/

test('confirmPoll async action creator returns expected action', (t) => {

    let actual;
    const { dispatch, queue } = createThunk();

    const poll = {
        eventWhat: [true, false, false],
        eventWhere: [true, true]
    };
    const eventID = 'event:101';
    dispatch(confirmPoll(poll, eventID));

    [{ ...actual }] = queue;

    const expected = {
        type: CONFIRM_POLL_REQUEST,
        isFetching: true
    };

    t.deepEqual(actual, expected, "getEvent returns CONFIRM_POLL_REQUEST action");
    t.end();
});

test('confirmPollRequest action creator returns expected action', (t) => {

    const expected = {
        type: CONFIRM_POLL_REQUEST,
        isFetching: true
    };
    const actual = confirmPollRequest();

    t.deepEqual(actual, expected);
    t.end();

});

test('confirmPollSuccess action creator returns expected action', (t) => {
    const expected = {
        type: CONFIRM_POLL_SUCCESS,
        isFetching: false,
    };

    const actual = confirmPollSuccess();

    t.deepEqual(actual, expected);
    t.end();
});

test('confirmPollFailure action creator returns expected action', (t) => {
    const expected = {
        type: CONFIRM_POLL_FAILURE,
        isFetching: false,
    };

    const actual = confirmPollFailure();

    t.deepEqual(actual, expected);
    t.end();
});

/********
ADD HOST EVENT CHOICE ACTIONS
********/

test('addHostEventChoice action creator returns expected action', (t) => {

    const expected = {
        type: ADD_HOST_EVENT_CHOICE,
        eventType: "eventWhen",
        value: {
            date: "2015-12-12",
            time: "10:10"
        },
        index: 1
    };

    const actual = addHostEventChoice("eventWhen", { date: "2015-12-12", time: "10:10" },  1);

    t.deepEqual(actual, expected);
    t.end();
});

/********
CONFIRM EVENT ACTIONS
********/

test('confirmEvent async action creator returns expected action', (t) => {

    let actual;
    const { dispatch, queue } = createThunk();

    const hostEventChoices = {
        eventWhat: 0,
        eventWhere: 0
    };
    const eventID = 'event:101';
    dispatch(confirmEvent(hostEventChoices, eventID));

    [{ ...actual }] = queue;

    const expected = {
        type: CONFIRM_EVENT_REQUEST,
        isFetching: true
    };

    t.deepEqual(actual, expected, "confirmEvent returns CONFIRM_EVENT_REQUEST action");
    t.end();
});

test('confirmEventRequest action creator returns expected action', (t) => {

    const expected = {
        type: CONFIRM_EVENT_REQUEST,
        isFetching: true
    };
    const actual = confirmEventRequest();

    t.deepEqual(actual, expected);
    t.end();

});

test('confirmEventSuccess action creator returns expected action', (t) => {
    const expected = {
        type: CONFIRM_EVENT_SUCCESS,
        isFetching: false,
    };

    const actual = confirmEventSuccess();

    t.deepEqual(actual, expected);
    t.end();
});

test('confirmEventFailure action creator returns expected action', (t) => {
    const expected = {
        type: CONFIRM_EVENT_FAILURE,
        isFetching: false,
    };

    const actual = confirmEventFailure();

    t.deepEqual(actual, expected);
    t.end();
});

/********
UPDATE EVENT ACTIONS
********/

test('updateRSVP async action creator returns expected action', (t) => {

    let actual;
    const { dispatch, queue } = createThunk();

    const RSVPStatus = 'going';
    const eventID = 'event:101';
    dispatch(updateRSVP(RSVPStatus, eventID));

    [{ ...actual }] = queue;

    const expected = {
        type: UPDATE_RSVP_REQUEST,
        isFetching: true
    };

    t.deepEqual(actual, expected, "updateRSVP returns UPDATE_RSVP_REQUEST action");
    t.end();
});

test('updateRSVPRequest action creator returns expected action', (t) => {

    const expected = {
        type: UPDATE_RSVP_REQUEST,
        isFetching: true
    };
    const actual = updateRSVPRequest();

    t.deepEqual(actual, expected, 'updateRSVPRequest returns UPDATE_RSVP_REQUEST action');
    t.end();

});

test('updateRSVPSuccess action creator returns expected action', (t) => {

    const expected = {
        type: UPDATE_RSVP_SUCCESS,
        isFetching: false,
        data: eventFixtures.RSVP
    };

    const actual = updateRSVPSuccess(eventFixtures.RSVP);

    t.deepEqual(actual, expected, 'updateRSVPSuccess returns UPDATE_RSVP_SUCCESS action');
    t.end();
});

test('updateRSVPFailure action creator returns expected action', (t) => {

    const expected = {
        type: UPDATE_RSVP_FAILURE,
        isFetching: false,
        error: genericFixtures.genericError
    };

    const actual = updateRSVPFailure(genericFixtures.genericError);

    t.deepEqual(actual, expected, 'updateRSVPFailure returns UPDATE_RSVP_FAILURE action');
    t.end();
});


/********
CANCEL CONFIRMED EVENT ACTIONS
********/


test('deleteEvent async action creator returns expected action', (t) => {

    let actual;
    const { dispatch, queue } = createThunk();
    let eventID = 'event:100';
    dispatch(deleteEvent(eventID));

    [{ ...actual }] = queue;

    const expected = {
        type: DELETE_EVENT_REQUEST,
        isFetching: true
    };

    t.deepEqual(actual, expected, "deleteEvent returns DELETE_EVENT_REQUEST action");
    t.end();
});

test('deleteEventRequest action creator returns expected action', (t) => {

    const expected = {
        type: DELETE_EVENT_REQUEST,
        isFetching: true
    };
    const actual = deleteEventRequest();

    t.deepEqual(actual, expected);
    t.end();
});

test('DeleteEventSuccess action creator returns expected action', (t) => {


    const expected = {
        type: DELETE_EVENT_SUCCESS,
        isFetching: false
    };

    const actual = deleteEventSuccess();

    t.deepEqual(actual, expected);
    t.end();
});

test('deleteEventFailure action creator returns expected action', (t) => {

    const error = {
        message: "Whoops"
    };
    const expected = {
        type: DELETE_EVENT_FAILURE,
        isFetching: false,
        error
    };

    const actual = deleteEventFailure(error);

    t.deepEqual(actual, expected);
    t.end();
});

/********
SAVE EDITED EVENT ACTIONS
********/


test('saveEditedEvent async action creator returns expected action', (t) => {

    let actual;
    const { dispatch, queue } = createThunk();
    let eventWhat = ["what"];
    let eventWhere = [
        {
            placeName: "name",
            placeAddress: "address"
        }
    ];
    let eventWhen = [
        {
            date: "date",
            time: "00:00"
        }
    ];
    let eventID = 'event:100';

    dispatch(saveEditedEvent(eventWhat, eventWhere, eventWhen, eventID));

    [{ ...actual }] = queue;

    const expected = {
        type: SAVE_EDITED_EVENT_REQUEST,
        isFetching: true
    };

    t.deepEqual(actual, expected, "saveEditedEvent returns SAVE_EDITED_EVENT_REQUEST action");
    t.end();
});

test('saveEditedEventRequest action creator returns expected action', (t) => {

    const expected = {
        type: SAVE_EDITED_EVENT_REQUEST,
        isFetching: true
    };
    const actual = saveEditedEventRequest();

    t.deepEqual(actual, expected);
    t.end();
});

test('saveEditedEventSuccess action creator returns expected action', (t) => {


    const expected = {
        type: SAVE_EDITED_EVENT_SUCCESS,
        isFetching: false
    };

    const actual = saveEditedEventSuccess();

    t.deepEqual(actual, expected);
    t.end();
});

test('saveEditedEventFailure action creator returns expected action', (t) => {

    const error = {
        message: "Whoops"
    };
    const expected = {
        type: SAVE_EDITED_EVENT_FAILURE,
        isFetching: false,
        error
    };

    const actual = saveEditedEventFailure(error);

    t.deepEqual(actual, expected);
    t.end();
});


/********
UPDATE_NOTIFICATION ACTIONS
********/


test('updateNotification async action creator returns expected action', (t) => {

    let actual;
    const { dispatch, queue } = createThunk();
    let index = 1;

    dispatch(updateNotification(index));

    [{ ...actual }] = queue;

    const expected = {
        type: UPDATE_NOTIFICATION_REQUEST,
        updateNotification: true
    };

    t.deepEqual(actual, expected, "updateNotification returns UPDATE_NOTIFICATION_REQUEST action");
    t.end();
});

test('updateNotificationRequest action creator returns expected action', (t) => {

    const expected = {
        type: UPDATE_NOTIFICATION_REQUEST,
        updateNotification: true
    };
    const actual = updateNotificationRequest();

    t.deepEqual(actual, expected);
    t.end();
});

test('updateNotificationSuccess action creator returns expected action', (t) => {


    const expected = {
        type: UPDATE_NOTIFICATION_SUCCESS,
        updateNotification: false
    };

    const actual = updateNotificationSuccess();

    t.deepEqual(actual, expected);
    t.end();
});

test('updateNotificationFailure action creator returns expected action', (t) => {

    const error = {
        message: "Whoops"
    };
    const expected = {
        type: UPDATE_NOTIFICATION_FAILURE,
        updateNotification: false,
        error
    };

    const actual = updateNotificationFailure(error);

    t.deepEqual(actual, expected);
    t.end();
});
