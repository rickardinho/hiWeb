import test from 'tape';
import { GET_USER, GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILURE } from '../../../src/js/actions/user.js';
import { getUser, getUserRequest, getUserSuccess, getUserFailure } from '../../../src/js/actions/user.js';
import createThunk from '../../utils/mock-thunk.js';

test('getUser async action creator returns expected action', (t) => {
    let actual;
    const { dispatch, queue } = createThunk();
    dispatch(getUser());

    [{...actual}] = queue;

    const expected = {
        type: GET_USER_REQUEST,
        isFetching: true
    };
    t.deepEqual(actual, expected, "getUser returns the GET_USER_REQUEST action");
    t.end();
});

test('getUserRequest creates the correct action', (t) => {

    const expected = {
        type: GET_USER_REQUEST,
        isFetching: true
    };
    const actual = getUserRequest();

    t.deepEqual(actual, expected);
    t.end();
});


test('getUserSuccess creates the correct action', (t) => {

    const data = {
        firstName: "Harry",
        lastName: "Potter"
    };
    const expected = {
        type: GET_USER_SUCCESS,
        isFetching: false,
        data
    };
    const actual = getUserSuccess(data);

    t.deepEqual(actual, expected);
    t.end();
});

test('getUserFailure creates the correct action', (t) => {

    const error = {
        message: "Whoops"
    };
    const expected = {
        type: GET_USER_FAILURE,
        isFetching: false,
        error
    };
    const actual = getUserFailure(error);

    t.deepEqual(actual, expected);
    t.end();
});
