import test from 'tape';
import getLatestEventPhoto from '../../../server/db/getLatestEventPhoto.js';
import savePhotoToDB from '../../../server/db/savePhotoToDB.js';
import { photoToAdd, SOHIL_ID } from '../../utils/fixtures.js';

import client from '../../../server/db/init.js';


test('getLatestEventPhoto retrieves the latest photo', (t) => {

    savePhotoToDB('event:100', photoToAdd, SOHIL_ID, (error, response) => {

        getLatestEventPhoto('event:100', (error, photo) => {

            t.equal(photo.photoURL, photoToAdd);
            t.equal(photo.userID, SOHIL_ID);
            t.end();
        });
    });
});

test(`TEARDOWN FOR ${__dirname}`, (t) => {

    client.del('photos:event:100');
    t.end();
});
