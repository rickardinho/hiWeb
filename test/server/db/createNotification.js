import test from 'tape';
import createNotification from '../../../server/lib/createNotification.js';

test('createNotification returns a valid notification object for a poll event', (t) => {

    const expected = {
        isPoll: true,
        timestamp: Date.now(),
        eventID: "event:100",
        firstName: "Sohil",
        lastName: "Pandya",
        photoURL: "https://scontent.xx.fbcdn.net/v/t1.0-1/p320x320/12821522_10154022257850996_5243104697257562021_n.jpg?oh=3b82501dc03ce1aa1d0db64278f606fa&oe=57AC45AB",
        eventWhat: [
            "Bowling",
            "Drinking"
        ],
        eventWhen: [
            {
                date: "2016-11-01",
                time: "17:00"
            }
        ],
        eventWhere: [
            {
                placeName: "TBC",
                placeAddress: ""
            }
        ],
        hostID: 12345678,
        viewed: false,
        inviteesNumber: 3,
        eventName: "Sohil's bowling"
    };
    const eventID = "event:100";
    const testUser = 10154129575200996;
    const eventInfo = {
        hostID: 12345678,
        eventName: "Sohil's bowling",
        eventDescription: "Let's go bowling",
        isPoll: true,
        eventWhat: [
            "Bowling",
            "Drinking"
        ],
        eventWhen: [
            {
                date: "2016-11-01",
                time: "17:00"
            }
        ],
        eventWhere: [
            {
                placeName: "TBC",
                placeAddress: ""
            }
        ],
        invitees: [
            { user: 1 },
            { user: 2 },
            { user: 3 }
        ]
    };
    createNotification(testUser, eventID, eventInfo, (error, result) => {

        for (let key in result) {
            if (key === 'timestamp') {
                t.ok(result.timestamp <= (expected.timestamp + 1000), "timestamp within a one-second range");
            } else {
                t.deepEqual(result[key], expected[key]);
            }
        }
        t.end();
    });
});

test('createNotification returns a valid notification object for a confirmed event', (t) => {

    const expected = {
        isPoll: false,
        timestamp: Date.now(),
        eventID: "event:200",
        firstName: "Sohil",
        lastName: "Pandya",
        photoURL: "https://scontent.xx.fbcdn.net/v/t1.0-1/p320x320/12821522_10154022257850996_5243104697257562021_n.jpg?oh=3b82501dc03ce1aa1d0db64278f606fa&oe=57AC45AB",
        eventWhat: [
            "Bowling",
            "Drinking"
        ],
        eventWhen: [
            {
                date: "2016-11-01",
                time: "17:00"
            }
        ],
        eventWhere: [
            {
                placeName: "TBC",
                placeAddress: ""
            }
        ],
        hostID: 12345678,
        viewed: false,
        inviteesNumber: 3,
        eventName: "Sohil's bowling"
    };
    const testUser = 10154129575200996;
    const eventID = "event:200";
    const eventInfo = {
        isPoll: false,
        hostID: 12345678,
        eventName: "Sohil's bowling",
        eventDescription: "Let's go bowling",
        eventWhat: [
            "Bowling",
            "Drinking"
        ],
        eventWhen: [
            {
                date: "2016-11-01",
                time: "17:00"
            }
        ],
        eventWhere: [
            {
                placeName: "TBC",
                placeAddress: ""
            }
        ],
        invitees: [
            { user: 1 },
            { user: 2 },
            { user: 3 }
        ]
    };
    createNotification(testUser, eventID, eventInfo, (error, result) => {

        for (let key in result) {
            if (key === 'timestamp') {
                t.ok(result.timestamp <= (expected.timestamp + 1000), "timestamp within a one-second range");
            } else {
                t.deepEqual(result[key], expected[key]);
            }
        }
        t.end();
    });
});
