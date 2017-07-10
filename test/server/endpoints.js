import test from 'tape';
import { server } from '../utils/initDB.js';
import client from '../../server/db/init.js';
import parseObjectValues from '../../server/lib/parseObjectValues.js';
import * as fixtures from '../utils/fixtures.js';


test('`/` endpoint works', (t) => {

    if (!process.env.DEVELOPMENT) {
        throw new Error("Please set testing environment variables");
    }

    const options = {
        method: 'GET',
        url: '/'
    };

    server.inject(options, (response) => {

        t.ok(response.payload.indexOf('<title>Spark</title>') > -1, "index page loads");
        t.end();
    });
});

test('`get-user` retrieves user information from database EXCLUDING token', (t) => {

    const options = {
        method: 'GET',
        url: '/get-user?userID=12345678'
    };

    server.inject(options, (response) => {

        t.deepEqual(response.result, fixtures.Harry, "Correct user information retrieved");
        t.end();
    });
});

test.skip('`/get-notifications` works', (t) => {
/* convert to socket test */
    const options = {
        method: 'GET',
        url: '/get-notifications?userID=12345678'
    };

    server.inject(options, (response) => {

        const actual = JSON.parse(response.payload);
        const expectedKeys = Object.keys(fixtures.eventPollSohilNotification);

        t.ok(Array.isArray(actual), 'An array is returned');
        t.equal(typeof actual[0], 'object', 'An array of notification objects is returned');

        expectedKeys.forEach((expectedKey) => {

            t.ok(actual[0].hasOwnProperty(expectedKey), `The '${expectedKey}' key exists`);
        });
        t.end();
    });
});

test('`get-calendar` works', (t) => {

    const options = {
        method: 'GET',
        url: '/get-calendar?userID=' + fixtures.SOHIL_ID
    };

    server.inject(options, (response) => {

        const result = response.result;
        console.log(result);

        const expectedKeys = Object.keys(fixtures.eventConfirmedHarry);

        t.ok(Array.isArray(result), 'An array is returned');
        t.equal(typeof result[0], 'object', 'An array of calendar objects is returned');
        expectedKeys.forEach((expectedKey) => {

            t.ok(result[0].hasOwnProperty(expectedKey), `The '${expectedKey}' key exists`);
        });
        t.end();
    });
});

test('`new-event` adds a poll event', (t) => {

    const options = {
        method: 'POST',
        url: '/new-event',
        payload: fixtures.eventPollSohil
    };

    server.inject(options, (response) => {

        t.ok(response.result, 'truthiness is returned');
        client.exists('calendar:' + fixtures.HARRY_ID, (error, response) => {
            /* TEARDOWN
            - decrement eventKeys
            - delete event
            - delete notification
            */
            client.decr('eventKeys');
            client.del('event:301');
            client.lpop('notifications:12345678');
            t.end();
        });
    });
});

test('`new-event` adds a confirmed event', (t) => {

    const options = {
        method: 'POST',
        url: '/new-event',
        payload: fixtures.eventConfirmedHarry
    };

    server.inject(options, (response) => {

        t.ok(response.result, 'truthiness is returned');
        /* TEARDOWN
        - decrement eventKeys
        - delete event
        - delete notification
        */
        client.decr('eventKeys');
        client.del('event:101');
        client.del('notifications:' + fixtures.SOHIL_ID);
        client.del('calendar:12345678');
        client.del('calendar:' + fixtures.SOHIL_ID);
        t.end();
    });
});

test.skip('`new-event-friends` works', (t) => {
    /* ADD REAL FRIENDS TO DB */
    const options = {
        method: 'GET',
        url: '/new-event/friends?userID=' + fixtures.SOHIL_ID
    };

    server.inject(options, (response) => {

        t.end();
    });
});

test('`get-event` works', (t) => {

    const options = {
        method: 'GET',
        url: '/get-event?eventID=' + fixtures.eventConfirmedHarryEventID + '&userID=' + fixtures.SOHIL_ID
    };
    let eventObjectKeys = Object.keys(fixtures.eventConfirmedHarry);
    eventObjectKeys.push('eventID');
    server.inject(options, (response) => {


        Object.keys(response.result.event).forEach((key) => {

            t.ok(eventObjectKeys.indexOf(key) !== -1, `'${key}' exists in event object`);
        });
        t.equal(response.statusCode, 200, '200 status code');
        t.end();
    });
});

test('`confirm-poll` works', (t) => {

    const options = {
        method: 'POST',
        url: '/confirm-poll',
        payload: {
            userID: '12345678',
            eventID: 'event:300',
            poll: fixtures.eventPollSohilVoted
        }
    };

    server.inject(options, (response) => {

        t.ok(1, 'Successful POST request');
        t.end();
    });
});

test('`confirm-event` works', (t) => {

    const hostEventChoices = {
        eventWhat: 0,
        eventWhere: 1,
        eventWhen: 1
    };
    const options = {
        method: 'POST',
        url: '/confirm-event',
        payload: {
            hostEventChoices,
            eventID: 'event:400',
            poll: fixtures.eventPollSohilVoted
        }
    };

    let expected = fixtures.pollToConfirmedEventAfter;
    expected.eventID = "event:400";
    const inviteeID = fixtures.pollToConfirmedEvent.invitees[0].id;

    server.inject(options, (response) => {

        t.ok(1, 'Successful POST request');
        client.hgetallAsync('event:400')
            .then((event) => {

                t.deepEqual(parseObjectValues(event), expected, 'Event is successfully confirmed');

                client.smembers('calendar:' + inviteeID, (error, calendar) => {

                    const latestCalendarEntry = calendar.filter((item) => {
                        return item === 'event:400';
                    });

                    t.equal(latestCalendarEntry[0], 'event:400', 'A calendar item was created');

                    client.lrange("notifications:" + inviteeID, 0, 0, (error, notifications) => {

                        var latestNotification = JSON.parse(notifications[0]).eventID;
                        t.equal(latestNotification, 'event:400', 'A notification was created');
                        client.del('event:400');
                        client.srem('calendar:' + inviteeID, 'event:400');
                        client.lpop("notifications:" + inviteeID);
                        t.end();
                    });
                });

            });
    });
});


test('`edit-event` works', (t) => {

    const options = {
        method: 'POST',
        url: '/edit-event',
        payload: {
            userID: '12345678',
            eventID: 'event:100',
            eventWhat: ["what"],
            eventWhere: [
                {
                    placeName: "name",
                    placeAddress: "address"
                }
            ],
            eventWhen: [
                {
                    date: "date",
                    time: "00:00"
                }
            ]
        }
    };

    server.inject(options, (response) => {

        t.ok(1, 'Successful POST request');
        t.end();
    });
});

test('`delete-event` works', (t) => {

    const options = {
        method: 'GET',
        url: '/delete-event?eventID=event:500'
    };

    server.inject(options, (response) => {

        //checking if the event is deleted and then if the event is deleted from the users calendar set
        client.exists('event:500', (error, actual) => {

            t.equal(actual, 0, "event has been deleted");

            client.sismember('calendar:10154129575200996', 'event:500', (error, actual2) => {

                t.equal(actual2, 0, "event has been deleted from the users calendar set");

                client.exists('RSVP:event:500|going', (error, actual3) => {

                    t.equal(actual3, 0, "RSVP has been deleted for the event");
                    t.equal(response.statusCode, 200, '200 status code');
                    t.end();
                });

            });

        });

    });

});

test('`update-notification` works', (t) => {

    const options = {
        method: 'GET',
        url: '/update-notification?index=1&userID=12345678'
    };

    server.inject(options, (response) => {

        t.equal(response.statusCode, 200, '200 status code');
        t.end();
    });
});

test('`/get-s3-url` works', (t) => {

    const options = {
        method: 'GET',
        url: '/get-s3-url?filename=test_file&filetype=jpg'
    };

    server.inject(options, (response) => {

        t.equal(response.statusCode, 200, '200 status code');
        t.end();
    });
});

test('`/delete-photo` works', (t) => {

    const options = {
        method: 'POST',
        url: '/delete-photo',
        payload: {
            photo: {
                photoURL: "www.photourl.com",
                timestamp: 12345678,
                userID: 12345678
            }
        }
    };

    server.inject(options, (response) => {

        t.equal(response.statusCode, 200, '200 status code');
        t.end();
    });
});


test.skip('`/share-photo` works', (t) => {

    const options = {
        method: 'POST',
        url: '/share-photo',
        payload: {
            photoURL: "www.photourl.com",
            userID: 12345678
        }
    };

    server.inject(options, (response) => {

        t.equal(response.statusCode, 200, '200 status code');
        t.end();
    });
});
