import test from 'tape';
import getUserVotes from '../../../server/lib/getVotes.js';
import client from '../../../server/db/init.js';

client.saddAsync('vote:event:301|eventWhat:0', 'user:11111111');
client.saddAsync('vote:event:301|eventWhen:0', 'user:11111111');
client.saddAsync('vote:event:301|eventWhere:0', 'user:11111111');
client.saddAsync('vote:event:301|eventWhere:2', 'user:11111111');



test('getUserVotes returns the correct object', (t) => {
    var eventID = 'event:301';
    var eventObject = {
        eventWhat: ['sohil', 'pandya', 'nooo'],
        eventWhere: [
            {
                placeName: "Harrods",
                placeAddress: "Kensington"
            },
            {
                placeName: "Harrods",
                placeAddress: "Kensington"
            },
            {
                placeName: "Harrods",
                placeAddress: "Kensington"
            }
        ],
        eventWhen: [
            {
                date: '2015-12-12',
                time: '10:00'
            },
            {
                date: '2016-12-12',
                time: '10:00'
            }]
    };
    var expected = {
        eventWhat: [1, 0, 0],
        eventWhere: [1, 0, 1],
        eventWhen: [1, 0]
    };

    getUserVotes(eventObject, eventID, (error, setVoteObject) => {

        t.deepEqual(setVoteObject, expected, 'eventObjects is set correctly');
        t.end();
    });
});
