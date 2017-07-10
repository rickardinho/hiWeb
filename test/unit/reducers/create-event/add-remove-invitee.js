import test from 'tape';
import reducer from '../../../../src/js/reducers/create-event.js';

test('Reducer handles ADD_INVITEE as expected', (t) => {
    const initialState = {
        invitees: [],
        friends: [{
            name:"sohil"
        }]
    };

    const data = {
        firstName: "harry",
        lastName: "potter",
        photoURL: "http",
        id: 12345678
    };

    const action = {
        type: "ADD_INVITEE",
        data: data,
        index: 0
    };

    const nextState = reducer(initialState, action);
    const expected = {
        invitees: [{
            firstName: "harry",
            lastName: "potter",
            photoURL: "http",
            id: 12345678
        }],
        friends: []
    };

    t.deepEqual(nextState, expected, "ADD_INVITEE sets state correctly");
    t.end();
});

test('Reducer handles REMOVE_INVITEE as expected', (t) => {
    const initialState = {
        invitees: [{
            name:"sohil"
        }],
        friends: []
    };

    const data = {
        name: "sohil",
    };

    const action = {
        type: "REMOVE_INVITEE",
        data: data,
        index: 0
    };

    const nextState = reducer(initialState, action);
    const expected = {
        invitees: [],
        friends: [{
            name:"sohil"
        }]
    };

    t.deepEqual(nextState, expected, "REMOVE_INVITEE sets state correctly");
    t.end();
});
