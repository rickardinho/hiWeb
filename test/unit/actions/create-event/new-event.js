import test from 'tape';
import configureMockStore from 'redux-mock-store';
import nock from 'nock';
import thunk from 'redux-thunk';
import { NEW_EVENT_REQUEST, NEW_EVENT_SUCCESS, NEW_EVENT_FAILURE } from '../../../../src/js/actions/create-event.js';
import { newEvent, newEventRequest, newEventSuccess, newEventFailure } from '../../../../src/js/actions/create-event.js';
import createThunk from '../../../utils/mock-thunk.js';


test('newEvent async action creator returns expected action', (t) => {
    let actual;
    const { dispatch, queue } = createThunk();
    dispatch(newEvent());

    [{ ...actual }] = queue;

    const expected = {
        type: NEW_EVENT_REQUEST,
        isFetching: true
    };
    t.deepEqual(actual, expected, "newEvent return the NEW_EVENT_SUCCESS action");
    t.end();
});

test('newEventRequest returns expected action', (t) => {

    let actual = newEventRequest();
    const expected = {
        type: NEW_EVENT_REQUEST,
        isFetching: true
    };
    t.deepEqual(actual, expected, "newEventRequest returns the NEW_EVENT_REQUEST action");
    t.end();
});

test('newEventSuccess returns expected action', (t) => {

    let actual = newEventSuccess();
    const expected = {
        type: NEW_EVENT_SUCCESS,
        isFetching: false,
        didSave: true
    };
    t.deepEqual(actual, expected, "newEventSuccess returns the NEW_EVENT_SUCCESS action");
    t.end();
});

test('newEventFailure returns expected action', (t) => {

    let actual = newEventFailure({ message: "Whoops" });
    const expected = {
        type: NEW_EVENT_FAILURE,
        didSave: false,
        isFetching: false,
        error: {
            message: "Whoops"
        }
    };
    t.deepEqual(actual, expected, "newEventFailure returns the NEW_EVENT_FAILURE action");
    t.end();
});


test.skip('testing the NEW_EVENT_REQUEST works as expected', (t) => {

    const mockStore = configureMockStore([thunk]);
    nock('http://localhost:8080')
        .post('/new-event', { error: "Whoops" })
        .reply(500);

    const expectedActions = [
        {
            type: "NEW_EVENT",
            isFetching: true
        },
        {
            type: "NEW_EVENT_SUCCESS",
            isFetching: false,
            didSave: true
        }
    ];

    const store =  mockStore( { state: "" });

    return store.dispatch(newEventRequest({ state: 'something' }))
        .then( () => {
            t.deepEqual(store.getActions(), expectedActions, "actions returned correctly");
            t.end();
        });
});
