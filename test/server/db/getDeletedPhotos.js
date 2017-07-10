import test from 'tape';
import getDeletedPhotos from '../../../server/db/getDeletedPhotos.js';
import client from '../../../server/db/init.js';

var deletedPhoto = "deletedPhotoURL";


client.lpush("photos:event:100|12345678", deletedPhoto);

test('getDeletedPhotos returns the correct data', (t) => {
    var userID = 12345678;
    var eventID = "event:100";
    getDeletedPhotos(eventID, userID, (error, response) => {

        var expected = [
            'deletedPhotoURL'
        ];
        t.ok(typeof response[0] === 'string', "returned data is parsed from getDeletedPhotos");
        t.deepEqual(response, expected, "array returned is as expected for getDeletedPhotos");
        t.end();
    });
});

test('teardown for getEventPhotos Test', (t) => {

    client.del("photos:event:100|12345678");
    t.end();

});
