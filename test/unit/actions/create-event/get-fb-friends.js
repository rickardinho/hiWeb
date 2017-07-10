import test from 'tape';
import { GET_FB_FRIENDS, GET_FB_FRIENDS_REQUEST, GET_FB_FRIENDS_SUCCESS, GET_FB_FRIENDS_FAILURE } from '../../../../src/js/actions/create-event.js';
import { getFBFriends, getFBFriendsRequest, getFBFriendsSuccess, getFBFriendsFailure } from '../../../../src/js/actions/create-event.js';
import createThunk from '../../../utils/mock-thunk.js';


test('getFBFriends async action creator returns expected action', (t) => {
    let actual;
    const { dispatch, queue } = createThunk();
    dispatch(getFBFriends());

    [{...actual}] = queue;

    const expected = {
        type: GET_FB_FRIENDS_REQUEST,
        isFetching: true,
        data: []
    };
    t.deepEqual(actual, expected, "newEvent return the GET_FB_FRIENDS action");
    t.end();
});

test('getFBFriendsRequest creates the correct action', (t) => {

    const expected = {
        type: GET_FB_FRIENDS_REQUEST,
        isFetching: true,
        data: []
    };
    const actual = getFBFriendsRequest();

    t.deepEqual(actual, expected);
    t.end();
});

test('getFBFriendsSuccess creates the correct action', (t) => {

    const data = {
        firstName: "sohil"
    };
    const expected = {
        type: GET_FB_FRIENDS_SUCCESS,
        isFetching: false,
        data: {
            firstName: "sohil"
        }
    };

    const actual = getFBFriendsSuccess(data);

    t.deepEqual(actual, expected);
    t.end();
});

test('getFBFriendsFailure creates the correct action', (t) => {

    const error = {
        message: "whoops"
    };
    const expected = {
        type: GET_FB_FRIENDS_FAILURE,
        isFetching: false,
        error: {
            message: "whoops"
        }
    };

    const actual = getFBFriendsFailure(error);

    t.deepEqual(actual, expected);
    t.end();
});
