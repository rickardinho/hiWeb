import test from 'tape';
import { SET_EVENT_DETAILS, SET_EVENT_WHAT, SET_EVENT_WHERE, SET_EVENT_WHEN } from '../../../../src/js/actions/create-event.js';
import { ADD_INPUT, REMOVE_INPUT } from '../../../../src/js/actions/create-event.js';
import { setEventDetails, setEventWhat, setEventWhere, setEventWhen } from '../../../../src/js/actions/create-event.js';
import { addInput, removeInput } from '../../../../src/js/actions/create-event.js';

test('setEventDetails creates the correct action', (t) => {

    const expected = {
        type: SET_EVENT_DETAILS,
        data: "someData",
        inputType: "someInputType",
        eventType: "eventDetails"
    };
    const actual = setEventDetails("someData", "someInputType");

    t.deepEqual(actual, expected);
    t.end();
});

test('setEventWhat creates the correct action', (t) => {

    const expected = {
        type: SET_EVENT_WHAT,
        data: "someData",
        inputKey: 4,
        eventType: "eventWhat"
    };
    const actual = setEventWhat("someData", 4);

    t.deepEqual(actual, expected);
    t.end();
});

test('setEventWhere creates the correct action', (t) => {

    const expected = {
        type: SET_EVENT_WHERE,
        data: "someData",
        inputKey: 4,
        eventType: "eventWhere"
    };
    const actual = setEventWhere("someData", 4);

    t.deepEqual(actual, expected);
    t.end();
});

test('setEventWhen creates the correct action', (t) => {

    const expected = {
        type: SET_EVENT_WHEN,
        data: "someData",
        inputKey: 4,
        eventType: "eventWhen",
        format: "timeOrDate"
    };
    const actual = setEventWhen("someData", 4, "timeOrDate");

    t.deepEqual(actual, expected);
    t.end();
});

test('addInput creates the correct action', (t) => {

    const expected = {
        type: ADD_INPUT,
        eventType: "theEventType",
        nextInputKey: 2
    };
    const actual = addInput(2, "theEventType");

    t.deepEqual(actual, expected);
    t.end();
});

test('removeInput creates the correct action', (t) => {

    const expected = {
        type: REMOVE_INPUT,
        inputKey: Infinity,
        eventType: "theEventType"
    };
    const actual = removeInput(Infinity, "theEventType");

    t.deepEqual(actual, expected);
    t.end();
});
