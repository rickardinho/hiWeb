import test from 'tape';
import stringifyObjectValues from '../../server/lib/stringifyObjectValues.js';
import parseObjectValues from '../../server/lib/parseObjectValues.js';

const testEvent = {
    eventName: "Birthday",
    eventDescription: "Let's do something!",
    hostID: 12345678,
    eventWhat: [
        "Bowling"
    ],
    eventWhere: [{
        placeName: "Harrods",
        placeAddress: "Knightsbridge"
    }],
    eventWhen: [{
        date: "2017-11-01",
        time: "17:00"
    }],
    isPoll: false,
    invitees: [
        { firstName: "Sohil", lastName: "Pandya" },
        { firstName: "Ron", lastName: "Weasley" }
    ]
};


test('stringifyObjectValues stringifies an event object as expected', (t) => {

    const actual = stringifyObjectValues(testEvent);
    t.equal(typeof actual.eventWhat, 'string');
    t.equal(typeof actual.eventWhere, 'string');
    t.equal(typeof actual.eventWhen, 'string');
    t.equal(typeof actual.invitees, 'string');
    t.end();
});

let semiStringified = stringifyObjectValues(testEvent);
semiStringified.hostID = JSON.stringify(testEvent.hostID);
semiStringified.isPoll = JSON.stringify(testEvent.isPoll);

test('parseObjectValues parses an event object as expected', (t) => {

    const actual = parseObjectValues(semiStringified);
    t.equal(typeof actual.eventName, 'string');
    t.equal(typeof actual.eventDescription, 'string');
    t.equal(typeof actual.hostID, 'string');
    t.equal(typeof actual.isPoll, 'boolean');
    t.equal(typeof actual.eventWhat, 'object');
    t.equal(typeof actual.eventWhere, 'object');
    t.equal(typeof actual.eventWhen, 'object');
    t.equal(typeof actual.invitees, 'object');
    t.end();
});
