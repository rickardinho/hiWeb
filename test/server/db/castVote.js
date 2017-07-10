import test from 'tape';
import client from '../../../server/db/init.js';
import castVote from '../../../server/db/castVote.js';


test('castVote adds user to the correct sets', (t) => {

    /*
        @params: poll, userID, eventID
    */
    const poll = {
        eventWhat: [true, false],
        eventWhere: [false, true]
    };
    const userID = 12345678;
    const eventID = 'event:101';
    const testSetKey1 = `vote:${eventID}|eventWhat:0`;
    const testSetKey2 = `vote:${eventID}|eventWhere:1`;


    castVote(poll, userID, eventID, (error, response) => {

        t.notOk(error, 'castVote executes without error');
        t.ok(response, 'castVote returns a value to the callback');

        client.smembersAsync(testSetKey1)
            .then((result1) => {

                t.deepEqual(result1, ['12345678'], 'User vote is added to respective vote set');

                client.smembersAsync(testSetKey2)
                .then((result2) => {
                    t.deepEqual(result2, ['12345678'], 'User vote is added to respective vote set');
                    t.end();
                });
            });

    });
});

test('castVote edits a user\'s previous vote', (t) => {

    const poll = {
        eventWhere: [true, false]
    };
    const userID = 12345678;
    const eventID = 'event:101';
    const testSetKey = `vote:${eventID}|eventWhere:1`;

    castVote(poll, userID, eventID, (error, response) => {

        t.notOk(error, 'castVote executes without error');
        t.ok(response, 'castVote returns a value to the callback');

        client.smembersAsync(testSetKey)
            .then((result) => {
                t.deepEqual(result, [], 'User\'s previous vote deleted');
                t.end();
            });
    });
});

test('castVote adds user to set when other votes exist', (t) => {

    /*
        @params: poll, userID, eventID
    */
    const poll = {
        eventWhat: [true, false],
        eventWhen: [false, true]
    };
    const userID = 98765432;
    const eventID = 'event:101';
    const testSetKey1 = `vote:${eventID}|eventWhat:0`;
    const testSetKey2 = `vote:${eventID}|eventWhen:1`;

    castVote(poll, userID, eventID, (error, response) => {

        t.notOk(error);
        t.ok(response);

        client.smembersAsync(testSetKey1)
            .then((result1) => {

                t.deepEqual(result1, ['12345678', '98765432'], 'New vote added to previous votes');

                client.smembersAsync(testSetKey2)
                    .then((result2) => {
                        t.deepEqual(result2, ['98765432'], 'New vote created');
                        t.end();
                    });
            });
    });
});

test('TEST TEARDOWN for castVote', (t) => {

    client.del("vote:event:101|eventWhat:0");
    client.del("vote:event:101|eventWhat:1");
    client.del("vote:event:101|eventWhat:2");
    client.del("vote:event:101|eventWhere:0");
    client.del("vote:event:101|eventWhere:1");
    client.del("vote:event:101|eventWhere:2");
    client.del("vote:event:101|eventWhen:0");
    client.del("vote:event:101|eventWhen:1");
    client.del("vote:event:101|eventWhen:2");
    t.end();
});
