import { eventConfirmedHarry } from '../../utils/fixtures.js';

export const calendar = {
    initialState: {
        data: [],
        isFetching: false,
        error: undefined
    },

    statePostRequest: {
        data: [],
        isFetching: true,
        error: undefined
    },

    statePostSuccess: {
        data: [eventConfirmedHarry],
        isFetching: false,
        error: undefined
    },

    statePostFailure: {
        data: [],
        isFetching: false,
        error: {
            message: "Whoops"
        }
    },

    data: [
        eventConfirmedHarry
    ]
};

export const event = {
    data: {},
    isFetching: false,
    error: undefined,
    poll: undefined,
    tally: undefined,
    hostEventChoices: undefined,
    invitees: undefined,
    RSVPs: undefined,
    updateNotification: false
};


export const photos = {
    isFetching: false,
    error: undefined,
    signedURL: undefined,
    photoURL: undefined,
    file: undefined,
    photos: [],
    selectedPhoto: undefined,
    deletedPhotos: [],
    hasPhotoLoaded: false
};
