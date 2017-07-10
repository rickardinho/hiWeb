import test from 'tape';
import markNotificationAsViewed from '../../../server/db/markNotificationAsViewed.js';
import client from '../../../server/db/init.js';

test('markNotificationAsViewed updates the notification correctly', (t) => {

    var index = 1;
    var userID = 12345678;

    markNotificationAsViewed(index, userID, (error, response) => {

        t.equal('OK', response, 'notification has been set to viewed');
        t.end();
    });
});
