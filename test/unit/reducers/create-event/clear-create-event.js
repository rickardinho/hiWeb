import test from 'tape';
import reducer from '../../../../src/js/reducers/create-event.js';

test('Reducer handles CLEAR_CREATE_EVENT as expected', (t) => {

    const initialState = {
        eventDetails: {
            eventName: 'An event',
            eventDescription: 'an amazing event',
            eventNote: 'note'

        },
        eventWhat: ['Dancing in the street'],
        eventWhere: [
            {
                placeName: 'Pall Mall',
                placeAddress: 'London'
            }
        ],
        eventWhen: [
            {
                date: '2016-06-07',
                time: '12:00'
            }
        ],
        friends: [],
        invitees: [{
            firstName: "Harry",
            lastName: "Potter",
            id: 12345678,
            photoURL: "http://harrypotter.com/image.jpg"
        }],
        isFetching: false,
        error: undefined,
        didSave: undefined,
        isPoll: false
    };

    const action = {
        type: "CLEAR_CREATE_EVENT"
    };

    const nextState = reducer(initialState, action);
    const expected = {
        eventDetails: {
            eventName: '',
            eventDescription: '',
            eventNote: ''
        },
        eventWhat: [''],
        eventWhere: [
            {
                placeName: '',
                placeAddress: ''
            }
        ],
        eventWhen: [
            {
                date: '',
                time: ''
            }
        ],
        friends: [],
        invitees: [],
        isFetching: false,
        error: undefined,
        didSave: undefined,
        isPoll: undefined
    };

    t.deepEqual(nextState, expected, 'CLEAR_CREATE_EVENT resets createEvent state');
    t.end();
});
