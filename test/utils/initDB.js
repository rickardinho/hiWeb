var client = require('../../server/db/init.js');
var stringifyObjectValues = require('../../server/lib/stringifyObjectValues.js');
var fixtures = require('./fixtures');
import Server from '../../server/index.js';
export const server = Server.init(process.env.PORT);

console.info("Initialising database for testing");
/*
- create Sohil
- create Harry
- create event:100 (confirmed)
- create event:100 notifications
- create event:300 (poll)
- create event:300 notifications
- create event:400 (poll) REMEMBER TO DELETE
*/
client.hmsetAsync("user:10154129575200996",
                 'firstName', fixtures.Sohil.firstName,
                 'lastName', fixtures.Sohil.lastName,
                 'id', fixtures.Sohil.id,
                 'token', process.env.SOHIL_TOKEN,
                 'photoURL', fixtures.Sohil.photoURL);

client.hmsetAsync("user:12345678",
          'firstName', fixtures.Harry.firstName,
          'lastName', fixtures.Harry.lastName,
          'id', fixtures.Harry.id,
          'token', "notokenhere",
          'photoURL', fixtures.Harry.photoURL);



/*
SET DEFAULT CONFIRMED EVENT 100
*/

var eventConfirmedDefault = stringifyObjectValues(fixtures.eventConfirmedHarry);

client.hmsetAsync("event:100", "eventName", eventConfirmedDefault.eventName,
                 "eventDescription", eventConfirmedDefault.eventDescription,
                 "eventNote", '',
                 "eventWhat", eventConfirmedDefault.eventWhat, "eventWhere", eventConfirmedDefault.eventWhere, "eventWhen", eventConfirmedDefault.eventWhen,
                 "invitees", eventConfirmedDefault.invitees, "isPoll", eventConfirmedDefault.isPoll,
                 "hostID", eventConfirmedDefault.hostID,
                 "hostPhotoURL", eventConfirmedDefault.hostPhotoURL, "eventID", "event:100", "hasEdited", "undefined");

client.lpush("notifications:12345678", JSON.stringify(fixtures.eventConfirmedHarryNotification));
client.sadd("calendar:" + fixtures.SOHIL_ID, fixtures.eventConfirmedHarryEventID);
client.lpush("photos:event:100", JSON.stringify(fixtures.eventConfirmedHarryPhotos));
client.sadd('RSVP' + ':' + 'event:100' + '|' + 'going', fixtures.SOHIL_ID);


/*
SET DEFAULT POLL EVENT 300
*/

var eventPollDefault = stringifyObjectValues(fixtures.eventPollSohil);

client.hmsetAsync("event:300", "eventName", eventPollDefault.eventName,
                 "eventDescription", eventPollDefault.eventDescription,
                 "eventWhat", eventPollDefault.eventWhat, "eventWhere", eventPollDefault.eventWhere, "eventWhen", eventPollDefault.eventWhen,
                 "invitees", eventPollDefault.invitees, "hostID", eventPollDefault.hostID, "isPoll", eventPollDefault.isPoll);


client.lpush("notifications:12345678", JSON.stringify(fixtures.eventPollSohilNotification));
client.sadd("calendar:" + fixtures.HARRY_ID, fixtures.eventPollSohilEventID);

/****
SET POLL TO CONFIRMED EVENT 400
****/

var pollToConfirmed = stringifyObjectValues(fixtures.pollToConfirmedEvent);

client.hmsetAsync("event:400", "eventName", pollToConfirmed.eventName,
                 "eventDescription", pollToConfirmed.eventDescription,
                 "eventWhat", pollToConfirmed.eventWhat, "eventWhere", pollToConfirmed.eventWhere, "eventWhen", pollToConfirmed.eventWhen,
                 "invitees", pollToConfirmed.invitees, "hostID", pollToConfirmed.hostID, "hostPhotoURL", pollToConfirmed.hostPhotoURL, "eventID", "event:400", "eventNote", '', "isPoll", pollToConfirmed.isPoll);


// client.saddAsync("notifications:12345678", JSON.stringify(fixtures.pollToConfirmedNotification));
// client.sadd("calendar:" + fixtures.HARRY_ID, fixtures.pollToConfirmedEventID);



/*
EVENT 500 Created specifically to test with delete-event tests.
*/

var eventConfirmedDefault = stringifyObjectValues(fixtures.eventConfirmedHarry);

client.hmset("event:500", "eventName", eventConfirmedDefault.eventName,
                 "eventDescription", eventConfirmedDefault.eventDescription,
                 "eventNote", '',
                 "eventWhat", eventConfirmedDefault.eventWhat, "eventWhere", eventConfirmedDefault.eventWhere, "eventWhen", eventConfirmedDefault.eventWhen,
                 "invitees", eventConfirmedDefault.invitees, "isPoll", eventConfirmedDefault.isPoll,
                 "hostID", eventConfirmedDefault.hostID,
                 "hostPhotoURL", eventConfirmedDefault.hostPhotoURL, "eventID", "event:500");

client.lpush("notifications:12345678", JSON.stringify(fixtures.eventConfirmedHarryNotification));
client.sadd("calendar:10154129575200996", "event:500");

/*
EVENT 600 Created specifically to test with deleteEventFromUserCalendars.
*/

var eventConfirmedDefault = stringifyObjectValues(fixtures.eventConfirmedHarry);

client.hmset("event:600", "eventName", eventConfirmedDefault.eventName,
                 "eventDescription", eventConfirmedDefault.eventDescription,
                 "eventNote", '',
                 "eventWhat", eventConfirmedDefault.eventWhat, "eventWhere", eventConfirmedDefault.eventWhere, "eventWhen", eventConfirmedDefault.eventWhen,
                 "invitees", eventConfirmedDefault.invitees, "isPoll", eventConfirmedDefault.isPoll,
                 "hostID", eventConfirmedDefault.hostID,
                 "hostPhotoURL", eventConfirmedDefault.hostPhotoURL, "eventID", "event:600", "hasEdited", "undefined");

client.lpush("notifications:12345678", JSON.stringify(fixtures.eventConfirmedHarryNotification));
client.lpush("notifications:10154129575200996", JSON.stringify(fixtures.eventConfirmedHarryNotification));
client.sadd("calendar:10154129575200996", "event:600");
client.sadd("calendar:12345678", "event:600");
