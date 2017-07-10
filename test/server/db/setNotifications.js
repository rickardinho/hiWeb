import test from 'tape';
import setNotifications from '../../../server/db/setNotifications.js';
import client from '../../../server/db/init.js';


test("setNotifications adds the sets correctly for all invitees", (t) => {

    const invitees = [
        12345678,
        10154129575200996
    ];

    const notification = {
        isPoll: true,
        timestamp: Date.now(),
        eventID: "event:100",
        hostName: "Sohil Pandya",
        hostPhotoURL: "https://scontent.xx.fbcdn.net/v/t1.0-1/p320x320/12821522_10154022257850996_5243104697257562021_n.jpg?oh=3b82501dc03ce1aa1d0db64278f606fa&oe=57AC45AB",
        subjectID: 12345678
    };

    const expected = [JSON.stringify(notification)];
    setNotifications(invitees, notification.subjectID, notification, (error, result) => {
        t.ok(result, "both sets added for invitees");

        client.lrange('notifications:12345678', 0, 0, (error, actual) => {
            t.notOk(error, "Notification saves without error");
            t.deepEqual(actual, expected, "returned stringified notification");
            t.end();
        });

    });
});

test('Deleting added notification set', (t) => {

    client.del("notifications:12345678");

    t.end();
});
