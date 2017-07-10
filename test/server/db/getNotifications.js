import test from 'tape';
import getNotifications from '../../../server/db/getNotifications.js';
import client from '../../../server/db/init.js';


test("getNotifications retrieves the notifications", (t) => {

    const expected = {
        isPoll: true,
        timestamp: Date.now(),
        eventID: "event:100",
        hostName: "Sohil Pandya",
        hostPhotoURL: "https://scontent.xx.fbcdn.net/v/t1.0-1/p320x320/12821522_10154022257850996_5243104697257562021_n.jpg?oh=3b82501dc03ce1aa1d0db64278f606fa&oe=57AC45AB"
    };

    getNotifications("notifications:12345678", (error, notifications) => {

        t.notOk(error);
        t.equal(Array.isArray(notifications), true, "Notification is an array");
        t.end();
    });
});
