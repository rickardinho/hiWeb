/***
USERS
***/
export const HARRY_ID = "12345678";
export const SOHIL_ID = "10154129575200996";
export const eventConfirmedHarryEventID = "event:100";
export const eventPollSohilEventID = "event:300";
export const pollToConfirmedEventID = "event:400";


export const Sohil = {
    id: SOHIL_ID,
    firstName: "Sohil",
    lastName: "Pandya",
    photoURL: "https://scontent.xx.fbcdn.net/v/t1.0-1/p320x320/12821522_10154022257850996_5243104697257562021_n.jpg?oh=3b82501dc03ce1aa1d0db64278f606fa&oe=57AC45AB"
};

export const Harry = {
    id: HARRY_ID,
    firstName: "Harry",
    lastName: "Potter",
    photoURL: "http://harrypotter.com/photo.jpg"
};

/*
EVENT:100 - confirmed
*/
export const eventConfirmedHarry = {
    eventName: "Harry's birthday",
    eventDescription: "It's my birthday",
    eventNote: '',
    eventWhat: ["Eat"],
    eventWhere: [{
        placeName: "Harrods",
        placeAddress: "Knightsbridge, London, United Kingdom"
    }],
    eventWhen: [{
        date: "2016-07-31",
        time: "11:00"
    }],
    invitees: [
        Sohil
    ],
    isPoll: false,
    hostID: Harry.id,
    hostPhotoURL: Harry.photoURL,
    hasEdited: "undefined"
};

export const eventConfirmedHarryNotification = {
    eventID: eventConfirmedHarryEventID,
    timestamp: Date.now(),
    firstName: Harry.firstName,
    lastName: Harry.lastName,
    photoURL: Harry.photoURL,
    eventWhat: eventConfirmedHarry.eventWhat,
    eventWhere: eventConfirmedHarry.eventWhere,
    eventWhen: eventConfirmedHarry.eventWhen,
    isPoll: false,
    hostID: Harry.id
};

export const eventConfirmedHarryPhotos = [
    {
        photoURL: 'https://spark-app-demo.s3-eu-west-1.amazonaws.com/event%3A117/1465480961130Screen%20Shot%202016-05-17%20at%2021.38.58.png',
        userID: '10154129575200996',
        timestamp: 1465480961379
    }
];

export const eventConfirmedHarryCalendar = {
    eventName: "Harry's birthday",
    eventDescription: "It's my birthday",
    eventNote: '',
    eventWhat: ["Eat"],
    eventID: eventConfirmedHarryEventID,
    eventWhere: [{
        placeName: "Harrods",
        placeAddress: "Knightsbridge, London, United Kingdom"
    }],
    eventWhen: [{
        date: "2016-07-31",
        time: "11:00"
    }],
    invitees: [
        Sohil
    ],
    isPoll: false,
    hostID: Harry.id,
    hostPhotoURL: Harry.photoURL,
    coverPhoto: eventConfirmedHarryPhotos[0]
};


export const photoToAdd = 'https://spark-app-demo.s3-eu-west-1.amazonaws.com/event%3A117/1465480858781Screen%20Shot%202016-05-17%20at%2011.17.48.png';

/*
EVENT:300 - poll
*/
export const eventPollSohil = {
    eventName: "Sohil's thing",
    eventDescription: "Let's go somewhere",
    eventWhat: ["Bowling", "Swimming", "Eating"],
    eventWhere: [{
        placeName: "All Star Lanes",
        placeAddress: "95 Brick Ln, London E1 6QL, United Kingdom"
    }],
    eventWhen: [{
        date: "2016-12-12",
        time: "12:00"
    }],
    invitees: [
        Harry
    ],
    isPoll: true,
    hostID: Sohil.id
};

/**
 ** event:300 notification
**/

export const eventPollSohilNotification = {
    eventID: eventPollSohilEventID,
    timestamp: Date.now(),
    firstName: Sohil.firstName,
    lastName: Sohil.lastName,
    photoURL: Sohil.photoURL,
    eventWhat: eventPollSohil.eventWhat,
    eventWhere: eventPollSohil.eventWhere,
    eventWhen: eventPollSohil.eventWhen,
    isPoll: true,
    hostID: Sohil.id
};

export const eventPollSohilVoted = {
    eventWhat: [true, false, true]
};

/*
EVENT:400 - poll to confirmed event
*/
export const pollToConfirmedEvent = {
    eventName: "Queen's birthday",
    eventDescription: "a royal occasion",
    eventWhat: ["Hiking", "Banquet", "Ball"],
    eventWhere: [
        {
            placeName: "Balmoral Castle",
            placeAddress: "Ballater, Aberdeenshire"
        },
        {
            placeName: "Buckingham Palace",
            placeAddress: "London"
        }
    ],
    eventWhen: [
        {
            date: "2016-06-12",
            time: "12:00"
        },
        {
            date: "2016-04-21",
            time: "12:00"
        }
    ],
    invitees: [
        Harry
    ],
    isPoll: true,
    hostID: Sohil.id,
    hostPhotoURL: Sohil.photoURL,
    eventNote: ''
};

export const pollToConfirmedEventAfter = {
    eventName: "Queen's birthday",
    eventDescription: "a royal occasion",
    eventWhat: ["Hiking"],
    eventWhere: [
        {
            placeName: "Buckingham Palace",
            placeAddress: "London"
        }
    ],
    eventWhen: [
        {
            date: "2016-04-21",
            time: "12:00"
        }
    ],
    invitees: [
        Harry
    ],
    isPoll: false,
    hostID: Sohil.id,
    hostPhotoURL: Sohil.photoURL,
    eventNote: ''

};


/**
 ** event:400 notification
**/

export const pollToConfirmedEventNotification = {
    eventID: pollToConfirmedEventID,
    timestamp: Date.now(),
    firstName: Sohil.firstName,
    lastName: Sohil.lastName,
    photoURL: Sohil.photoURL,
    eventWhat: pollToConfirmedEvent.eventWhat,
    eventWhere: pollToConfirmedEvent.eventWhere,
    eventWhen: pollToConfirmedEvent.eventWhen,
    isPoll: true,
    hostID: Sohil.id
};





export const genericError = {
    message: "Whoops"
};
