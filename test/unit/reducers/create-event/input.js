import test from 'tape';
import reducer from '../../../../src/js/reducers/create-event.js';
import { createEvent as initialState } from './fixtures.js';


test('Reducer handles ADD_INPUT as expected', (t) => {


    const action = {
        type: "ADD_INPUT",
        eventType: "eventWhen",
        nextInputKey: 1
    };

    const nextState = reducer(initialState, action);

    let expected = Object.assign({}, initialState);
    expected.eventWhen.push({
        date: '',
        time: ''
    });

    t.deepEqual(nextState, expected, "Reducer adds an element to the eventWhen array");

    /*-----*/

    const action2 = {
        type: "ADD_INPUT",
        eventType: "eventWhere",
        nextInputKey: 1
    };


    const nextState2 = reducer(initialState, action2);

    let expected2 = Object.assign({}, initialState);
    expected2.eventWhere = expected2.eventWhere.concat(['']);

    t.deepEqual(nextState2, expected2, "Reducer adds an element to the eventWhere array");
    t.end();
});

test('Reducer handles REMOVE_INPUT as expected', (t) => {

    let state = Object.assign({}, initialState);

    state.eventWhen = state.eventWhen.concat([
        {
            date: '',
            time: ''
        }
    ]);

    const action = {
        type: "REMOVE_INPUT",
        inputKey: 1,
        eventType: "eventWhen"
    };

    const nextState = reducer(state, action);

    let expected = Object.assign({}, initialState);

    t.deepEqual(nextState, expected, "Reducer removes last element on eventWhen array");
    /*-----*/
    const action2 = {
        type: "REMOVE_INPUT",
        inputKey: 1,
        eventType: "eventWhere"
    };

    let initialState2 = Object.assign({}, initialState);
    initialState2.eventWhere = [
        {
            placeName: 'Harrods',
            placeAddress: 'Knightsbridge'
        },
        {
            placeName: 'Founders & Coders',
            placeAddress: 'Bethnal Green'
        },
        {
            placeName: 'Bowling Alley',
            placeAddress: 'Brick Lane'
        }
    ];

    const nextState2 = reducer(initialState2, action2);

    let expected2 = Object.assign({}, initialState);
    expected2.eventWhere = [
        {
            placeName: 'Harrods',
            placeAddress: 'Knightsbridge'
        },
        {
            placeName: 'Bowling Alley',
            placeAddress: 'Brick Lane'
        }
    ];

    t.deepEqual(nextState2, expected2, "Reducer removes middle element in eventWhere array");
    t.end();
});

test('ADD_INPUT copies values from previous eventWhen values', (t) => {

    let state = Object.assign({}, initialState);
    state.eventWhen[0].date = '2016-07-07';
    state.eventWhen[0].time = '12:00';

    const action = {
        type: "ADD_INPUT",
        eventType: "eventWhen",
        nextInputKey: 1
    };

    const nextState = reducer(state, action);

    let expected = Object.assign({}, state);
    expected.eventWhen = expected.eventWhen.concat([{
        date: '2016-07-07',
        time: '12:00'
    }]);

    t.deepEqual(nextState, expected, "Values in new element match the previous element in eventWhen array");
    t.end();
});
