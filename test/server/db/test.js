import test from 'tape';
import client from '../../../server/db/init.js';
import saveNewEvent from '../../../server/db/saveNewEvent.js';

const eventWhat = JSON.stringify({
    0: "Bowling",
    1: "Swimming"
});
const eventWhere = JSON.stringify({
    0: {
        placeName: "Harrods",
        placeAddress: "Knightsbridge, London"
    }
});
const eventWhen = JSON.stringify({
    0: {
        date: "2016-11-10",
        time: "12:00"
    }
});
const invitees = JSON.stringify([12345678]);
const hostID = 10154129575200996;
const isPoll = true;

const event = {
    eventWhat,
    eventWhere,
    eventWhen,
    invitees,
    hostID,
    isPoll
};

test('New event is set correctly', (t) => {

    saveNewEvent(event, (error, result) => {
        t.notOk(error, "New event saves without error");
        t.end();
    });
});

test('saveNewEvent handles adding subsequent events', (t) => {

    saveNewEvent(event, (error, result) => {

        client.exists("event:2", (error, result) => {
            t.ok(result);
            t.end();
        });
    });
});

test('TEST TEARDOWN', (t) => {

    client.del("eventKeys");
    client.del("event:1");
    client.del("event:2");

    t.end();
});
