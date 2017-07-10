/*
 This will test that invitees are fetched properly
 Rather than test whole flow, will test passing an array of friends ('fetched' from fb) to the mapData function
*/
import test from 'tape';
import mapFriendsToUsers from '../../../server/lib/mapFriendsToUsers.js';

test('mapFriendsToUsers retrieves user info for each FB friend', (t) => {

    const expected = [
        {
            firstName: "Harry",
            lastName: "Potter",
            photoURL: "http://harrypotter.com/photo.jpg",
            id: '12345678',
        }
    ];

    const friendsFromFB = [
        {
            name: "Harry Potter",
            id: 12345678
        }
    ];

    mapFriendsToUsers(friendsFromFB, (error, friends) => {
    
        t.deepEqual(friends, expected, "function maps friends to users");
        t.end();
    });
});
