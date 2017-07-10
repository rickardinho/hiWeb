import test from 'tape';
import reducer from '../../../../src/js/reducers/create-event.js';
import { createEvent as stateFixture } from './fixtures.js';

test('Reducer handles GET_FB_FRIENDS_REQUEST as expected', (t) => {
    let initialState = stateFixture;
    let expected = stateFixture;

    const action = {
        type: "GET_FB_FRIENDS_REQUEST",
        isFetching: true,
    };

    const nextState = reducer(initialState, action);

    expected.isFetching = true;

    t.deepEqual(nextState, expected, 'GET_FB_FRIENDS_REQUEST sets state correctly');
    t.end();
});

test('Reducer handles GET_FB_FRIENDS_SUCCESS as expected', (t) => {
    let initialState = stateFixture;
    initialState.isFetching = true;
    let expected = stateFixture;

    const action = {
        type: "GET_FB_FRIENDS_SUCCESS",
        isFetching: false,
        data: ["an array of friends"]
    };

    const nextState = reducer(initialState, action);


    expected.isFetching = false;
    expected.friends = ["an array of friends"];

    t.deepEqual(nextState, expected, 'GET_FB_FRIENDS_SUCCESS sets state correctly');
    t.end();
});

test('Reducer handles GET_FB_FRIENDS_FAILURE as expected', (t) => {
    let initialState = stateFixture;
    initialState.isFetching = true;
    let expected = stateFixture;

    const action = {
        type: "GET_FB_FRIENDS_FAILURE",
        isFetching: false,
        error: {
            message: "An error occurred"
        }
    };

    const nextState = reducer(initialState, action);

    expected.isFetching = false;
    expected.error = {
        message: "An error occurred"
    };

    t.deepEqual(nextState, expected, 'GET_FB_FRIENDS_FAILURE sets state correctly');
    t.end();
});
