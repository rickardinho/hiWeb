import test from 'tape';
import { GET_NOTIFICATIONS, GET_NOTIFICATIONS_REQUEST, GET_NOTIFICATIONS_SUCCESS, GET_NOTIFICATIONS_FAILURE, APPLY_FILTER, CLEAR_FILTER } from '../../../src/js/actions/notifications.js';
import { getNotifications, getNotificationsRequest, getNotificationsSuccess, getNotificationsFailure, applyFilter, clearFilter } from '../../../src/js/actions/notifications.js';
import createThunk from '../../utils/mock-thunk.js';

test('getNotifications async action creator returns expected action', (t) => {

    let actual;
    const { dispatch, queue } = createThunk();
    dispatch(getNotifications());

    [{ ...actual }] = queue;

    const expected = {
        type: GET_NOTIFICATIONS_REQUEST,
        isFetching: true
    };
    t.deepEqual(actual, expected, "getNotifications returns the GET_NOTIFICATIONS_REQUEST action");
    t.end();
});

test('getNotificationsRequest creates the correct action', (t) => {

    const expected = {
        type: GET_NOTIFICATIONS_REQUEST,
        isFetching: true
    };
    const actual = getNotificationsRequest();

    t.deepEqual(actual, expected);
    t.end();
});

test('getNotificationsSuccess creates the correct action', (t) => {

    const data = [
        {
            isPoll: true,
            timestamp: 87676554462,
            eventID: 'event:101',
            hostName: 'Sohil Pandya',
            hostPhotoURL: 'https://photo.com/image.jpg',
            eventWhat: "Sohil's bowling",
            eventWhere: undefined,
            eventWhen: undefined
        }
    ];

    const expected = {
        type: GET_NOTIFICATIONS_SUCCESS,
        isFetching: false,
        data: data
    };
    const actual = getNotificationsSuccess(data);

    t.deepEqual(actual, expected);
    t.end();
});

test('getNotificationsFailure creates the correct action', (t) => {

    const error = {
        message: "Whoops"
    };
    const expected = {
        type: GET_NOTIFICATIONS_FAILURE,
        isFetching: false,
        error
    };
    const actual = getNotificationsFailure(error);

    t.deepEqual(actual, expected);
    t.end();
});

test('applyFilter creates the correct action', (t) => {

    const expected = {
        type: APPLY_FILTER,
        filter: true,
        showHosting: true
    };

    const actual = applyFilter(true);

    t.deepEqual(actual, expected);
    t.end();
});


test('clearFilter creates the correct action', (t) => {

    const expected = {
        type: CLEAR_FILTER,
        filter: false,
        showHosting: undefined
    };

    const actual = clearFilter(true);

    t.deepEqual(actual, expected);
    t.end();
});
