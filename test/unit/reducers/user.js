import test from 'tape';
import client from '../../../server/db/init.js';
import reducer from '../../../src/js/reducers/user.js';
import { server } from '../../utils/initDB.js';
import { feedSocket } from '../../../src/js/socket.js';
import { pub, sub } from '../../../server/init-socket.js';


test('Reducer handles GET_USER_REQUEST as expected', (t) => {

    const initialState = {
        isFetching: false,
        firstName: '',
        lastName: '',
        photoURL: '',
        id: '',
        error: undefined
    };
    const action = {
        type: "GET_USER_REQUEST",
        isFetching: true
    };
    const actual = reducer(initialState, action);
    const expected = {
        isFetching: true,
        firstName: '',
        lastName: '',
        photoURL: '',
        id: '',
        error: undefined
    };

    t.deepEqual(actual, expected, "GET_USER_REQUEST sets state correctly");
    t.end();
});

test('Reducer handles GET_USER_SUCCESS as expected', (t) => {
    const initialState = {
        isFetching: true,
        firstName: '',
        lastName: '',
        photoURL: '',
        id: '',
        error: undefined
    };
    const data = {
        firstName: 'Harry',
        lastName: 'Potter',
        photoURL: 'http://harrypotter.com/image.jpg',
        id: 12345678,
    };
    const action = {
        type: "GET_USER_SUCCESS",
        isFetching: false,
        data
    };
    const actual = reducer(initialState, action);
    const expected = {
        isFetching: false,
        firstName: 'Harry',
        lastName: 'Potter',
        photoURL: 'http://harrypotter.com/image.jpg',
        id: 12345678,
        error: undefined
    };

    t.deepEqual(actual, expected, "GET_USER_SUCCESS sets state correctly");
    t.end();
});

test('Reducer handles GET_USER_FAILURE as expected', (t) => {
    const initialState = {
        isFetching: false,
        firstName: '',
        lastName: '',
        photoURL: '',
        id: '',
        error: undefined
    };
    const error = {
        message: "Whoops"
    };
    const action = {
        type: "GET_USER_FAILURE",
        isFetching: false,
        error
    };
    const actual = reducer(initialState, action);
    const expected = {
        isFetching: false,
        firstName: '',
        lastName: '',
        photoURL: '',
        id: '',
        error: {
            message: "Whoops"
        }
    };

    t.deepEqual(actual, expected, "GET_USER_FAILURE sets state correctly");
    t.end();
});

test('FINAL TEST TEARDOWN: test/unit/reducers/user.js', (t) => {

    /* TEARDOWN: endpoints `new-event`
    - decrement eventKeys
    - delete event
    - delete notification
    - quit sockets and pub sub channels
    */
    feedSocket.disconnect();
    pub.quit();
    sub.quit();
    client.del("vote:event:300|eventWhat:0");
    client.del("vote:event:300|eventWhat:2");
    client.del('notifications:12345678');
    server.stop();
    client.quit(t.end);
});
