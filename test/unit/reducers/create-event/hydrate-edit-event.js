import test from 'tape';
import reducer from '../../../../src/js/reducers/create-event.js';

test('Reducer handles HYDRATE_CREATE_EVENT as expected', (t) => {
    const initialState = {
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

    const data = {

        eventName: "name",
        eventDescription: "description",
        eventNote: "note",
        eventWhat: ["eventwhat"],
        eventWhere: [
            {
                placeName: "placename",
                placeAddress: "placeaddress"
            }
        ],
        eventWhen: [
            {
                date: "10/10/2016",
                time: "00:00"
            }
        ]
    };

    const action = {
        type: "HYDRATE_CREATE_EVENT",
        data: data
    };

    const nextState = reducer(initialState, action);
    const expected = {
        eventDetails: {
            eventName: "name",
            eventDescription: "description",
            eventNote: "note"
        },
        eventWhat: ["eventwhat"],
        eventWhere: [
            {
                placeName: "placename",
                placeAddress: "placeaddress"
            }
        ],
        eventWhen: [
            {
                date: "10/10/2016",
                time: "00:00"
            }
        ],
        friends: [],
        invitees: [],
        isFetching: false,
        error: undefined,
        didSave: undefined,
        isPoll: undefined
    };

    t.deepEqual(nextState, expected, 'HYDRATE_CREATE_EVENT sets state correctly');
    t.end();
});
