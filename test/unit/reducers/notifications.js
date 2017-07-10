import test from 'tape';
import reducer from '../../../src/js/reducers/notifications.js';

test('Reducer handles GET_NOTIFICATIONS_REQUEST as expected', (t) => {

    const initialState = {
        data: [],
        isFetching: false,
        error: undefined,
        showHosting: undefined,
        filter: false
    };
    const action = {
        type: "GET_NOTIFICATIONS_REQUEST",
        isFetching: true
    };
    const actual = reducer(initialState, action);
    const expected = {
        data: [],
        isFetching: true,
        error: undefined,
        showHosting: undefined,
        filter: false
    };

    t.deepEqual(actual, expected);
    t.end();
});
test('Reducer handles GET_NOTIFICATIONS_SUCCESS as expected', (t) => {

    const initialState = {
        data: [],
        isFetching: true,
        error: undefined,
        showHosting: undefined,
        filter: false
    };
    const data = [{
        isPoll: true,
        timestamp: 87676554462,
        eventID: 'event:101',
        hostName: 'Sohil Pandya',
        hostPhotoURL: 'https://photo.com/image.jpg',
        eventWhat: "Sohil's bowling",
        eventWhere: undefined,
        eventWhen: undefined
    }];
    const action = {
        type: "GET_NOTIFICATIONS_SUCCESS",
        isFetching: false,
        data: data
    };
    const actual = reducer(initialState, action);
    const expected = {
        data: [
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
        ],
        isFetching: false,
        error: undefined,
        showHosting: undefined,
        filter: false
    };

    t.deepEqual(actual, expected, "Notification is fetched successfully");
    t.equal(Array.isArray(actual.data), true, "Notifications are inside an array");
    t.end();
});


test('Reducer handles GET_NOTIFICATIONS_FAILURE as expected', (t) => {

    const initialState = {
        data: [],
        isFetching: true,
        error: undefined,
        showHosting: undefined,
        filter: false
    };
    const error = {
        message: "There was an error..."
    };
    const action = {
        type: "GET_NOTIFICATIONS_FAILURE",
        isFetching: false,
        error: error
    };
    const actual = reducer(initialState, action);
    const expected = {
        data: [],
        isFetching: false,
        showHosting: undefined,
        filter: false,
        error: {
            message: "There was an error..."
        }
    };

    t.deepEqual(actual, expected);
    t.end();
});

test('Reducer handles APPLY_FILTER as expected (hosting)', (t) => {

    const initialState = {
        data: [],
        isFetching: false,
        error: undefined,
        showHosting: undefined,
        filter: false
    };

    const action = {
        type: "APPLY_FILTER",
        filter: true,
        showHosting: true
    };

    const actual = reducer(initialState, action);

    let expected = Object.assign({}, initialState);
    expected.filter = true;
    expected.showHosting = true;

    t.deepEqual(actual, expected);
    t.end();
});

test('Reducer handles APPLY_FILTER as expected (received)', (t) => {

    const initialState = {
        data: [],
        isFetching: false,
        error: undefined,
        showHosting: undefined,
        filter: false
    };

    const action = {
        type: "APPLY_FILTER",
        filter: true,
        showHosting: false
    };

    const actual = reducer(initialState, action);

    let expected = Object.assign({}, initialState);
    expected.filter = true;
    expected.showHosting = false;

    t.deepEqual(actual, expected);
    t.end();
});


test('Reducer handles CLEAR_FILTER as expected', (t) => {

    const initialState = {
        data: [],
        isFetching: false,
        error: undefined,
        showHosting: true,
        filter: true
    };

    const action = {
        type: "CLEAR_FILTER",
        filter: false,
        showHosting: undefined
    };

    const actual = reducer(initialState, action);

    let expected = Object.assign({}, initialState);
    expected.filter = false;
    expected.showHosting = undefined;

    t.deepEqual(actual, expected);
    t.end();
});
