import test from 'tape';
import { SET_FILE, setFile } from '../../../src/js/actions/photos.js';
import { GET_S3_URL, GET_S3_URL_REQUEST, GET_S3_URL_SUCCESS, GET_S3_URL_FAILURE } from '../../../src/js/actions/photos.js';
import { getS3URL, getS3URLRequest, getS3URLSuccess, getS3URLFailure } from '../../../src/js/actions/photos.js';
import { UPLOAD_PHOTO, UPLOAD_PHOTO_REQUEST, UPLOAD_PHOTO_SUCCESS, UPLOAD_PHOTO_FAILURE } from '../../../src/js/actions/photos.js';
import { uploadPhoto, uploadPhotoRequest, uploadPhotoSuccess, uploadPhotoFailure } from '../../../src/js/actions/photos.js';
import { SAVE_PHOTO_URL, SAVE_PHOTO_URL_REQUEST, SAVE_PHOTO_URL_SUCCESS, SAVE_PHOTO_URL_FAILURE } from '../../../src/js/actions/photos.js';
import { savePhotoURL, savePhotoURLRequest, savePhotoURLSuccess, savePhotoURLFailure } from '../../../src/js/actions/photos.js';
import { SELECT_PHOTO, selectPhoto } from '../../../src/js/actions/photos.js';
import { DELETE_PHOTO, DELETE_PHOTO_REQUEST, DELETE_PHOTO_SUCCESS, DELETE_PHOTO_FAILURE } from '../../../src/js/actions/photos.js';
import { deletePhoto, deletePhotoRequest, deletePhotoSuccess, deletePhotoFailure } from '../../../src/js/actions/photos.js';
import { SHARE_PHOTO, SHARE_PHOTO_REQUEST, SHARE_PHOTO_SUCCESS, SHARE_PHOTO_FAILURE } from '../../../src/js/actions/photos.js';
import { sharePhoto, sharePhotoRequest, sharePhotoSuccess, sharePhotoFailure } from '../../../src/js/actions/photos.js';
import createThunk from '../../utils/mock-thunk.js';


/********
SET PHOTO ACTIONS
********/

test('setFile action creator returns expected action', (t) => {

    const data = {
        filename: "photo.jpg"
    };
    const expected = {
        type: SET_FILE,
        data
    };
    const actual = setFile(data);

    t.deepEqual(actual, expected, 'setFile returns the SET_FILE action');
    t.end();
});



/********
GET S3 SIGNED URL ACTIONS
********/

test('getS3URL async action creator returns expected action', (t) => {
    let actual;
    const { dispatch, queue } = createThunk();
    var filename = 'sohil.jpg';
    var filetype = 'jpg';
    var eventID = 'event:100';
    dispatch(getS3URL(filename, filetype, eventID));

    [{ ...actual }] = queue;

    const expected = {
        type: GET_S3_URL_REQUEST,
        isFetching: true
    };
    t.deepEqual(actual, expected, "getS3URL returns the GET_S3_URL_REQUEST action");
    t.end();
});


test('getS3URLRequest action creator returns expected action', (t) => {
    const expected = {
        type: GET_S3_URL_REQUEST,
        isFetching: true,
    };
    const actual = getS3URLRequest();

    t.deepEqual(actual, expected);
    t.end();
});

test('getS3URLSuccess action creator returns expected action', (t) => {

    var url = "http://url.com";
    const expected = {
        type: GET_S3_URL_SUCCESS,
        isFetching: false,
        signedURL: url
    };

    const actual = getS3URLSuccess(url);

    t.deepEqual(actual, expected);
    t.end();
});

test('getS3URLFailure action creator returns expected action', (t) => {

    const error = {
        message: "Whoops"
    };
    const expected = {
        type: GET_S3_URL_FAILURE,
        isFetching: false,
        error
    };

    const actual = getS3URLFailure(error);

    t.deepEqual(actual, expected);
    t.end();
});


/********
UPLOAD PHOTO ACTIONS
********/

test('uploadPhoto async action creator returns expected action', (t) => {
    let actual;
    const { dispatch, queue } = createThunk();
    var eventID = 'event:100';
    var photo = 'Photo.jpg';
    dispatch(uploadPhoto(photo, eventID));

    [{ ...actual }] = queue;

    const expected = {
        type: UPLOAD_PHOTO_REQUEST,
        isFetching: true
    };
    t.deepEqual(actual, expected, "uploadPhoto returns the UPLOAD_PHOTO_REQUEST action");
    t.end();
});


test('uploadPhotoRequest action creator returns expected action', (t) => {

    const expected = {
        type: UPLOAD_PHOTO_REQUEST,
        isFetching: true
    };
    const actual = uploadPhotoRequest();

    t.deepEqual(actual, expected);
    t.end();
});

test('uploadPhotoSuccess action creator returns expected action', (t) => {

    var url = "https://url.com";
    const expected = {
        type: UPLOAD_PHOTO_SUCCESS,
        isFetching: false,
        data: url
    };

    const actual = uploadPhotoSuccess(url);

    t.deepEqual(actual, expected);
    t.end();
});

test('uploadPhotoFailure action creator returns expected action', (t) => {

    const error = {
        message: "Whoops"
    };
    const expected = {
        type: UPLOAD_PHOTO_FAILURE,
        isFetching: false,
        error
    };

    const actual = uploadPhotoFailure(error);

    t.deepEqual(actual, expected);
    t.end();
});


/********
SAVE PHOTO URL ACTIONS
********/

test('savePhotoURL async action creator returns expected action', (t) => {
    let actual;
    const { dispatch, queue } = createThunk();
    var url = 'http://www.aws.com/photolocation.jpg';
    var eventID = 'event:100';
    dispatch(savePhotoURL(url, eventID));

    [{ ...actual }] = queue;

    const expected = {
        type: SAVE_PHOTO_URL_REQUEST,
        isFetching: true
    };
    t.deepEqual(actual, expected, "savePhotoURL returns the SAVE_PHOTO_URL_REQUEST action");
    t.end();
});


test('savePhotoURLRequest action creator returns expected action', (t) => {

    const expected = {
        type: SAVE_PHOTO_URL_REQUEST,
        isFetching: true
    };
    const actual = savePhotoURLRequest();

    t.deepEqual(actual, expected);
    t.end();
});

test('savePhotoURLSuccess action creator returns expected action', (t) => {

    var url = "https://url.com";
    const expected = {
        type: SAVE_PHOTO_URL_SUCCESS,
        isFetching: false
    };

    const actual = savePhotoURLSuccess();

    t.deepEqual(actual, expected);
    t.end();
});

test('savePhotoURLFailure action creator returns expected action', (t) => {

    const error = {
        message: "Whoops"
    };
    const expected = {
        type: SAVE_PHOTO_URL_FAILURE,
        isFetching: false,
        error
    };

    const actual = savePhotoURLFailure(error);

    t.deepEqual(actual, expected);
    t.end();
});

/********
SELECT PHOTO ACTIONS
********/

test('selectPhoto action creator returns expected action', (t) => {

    const url = "https://aws.com/photolocation.jpg";
    const expected = {
        type: SELECT_PHOTO,
        url
    };

    const actual = selectPhoto(url);

    t.deepEqual(actual, expected);
    t.end();
});

/********
DELETE PHOTO ACTIONS
********/

test('deletePhoto async action creator returns expected action', (t) => {
    let actual;
    const { dispatch, queue } = createThunk();
    var photoURL = 'http://www.aws.com/photolocation.jpg';
    var eventID = 'event:100';
    dispatch(deletePhoto(photoURL, eventID));

    [{ ...actual }] = queue;

    const expected = {
        type: DELETE_PHOTO_REQUEST,
        isFetching: true
    };
    t.deepEqual(actual, expected, "deletePhoto returns the DELETE_PHOTO_REQUEST action");
    t.end();
});


test('deletePhotoRequest action creator returns expected action', (t) => {

    const expected = {
        type: DELETE_PHOTO_REQUEST,
        isFetching: true
    };
    const actual = deletePhotoRequest();

    t.deepEqual(actual, expected);
    t.end();
});

test('deletePhotoSuccess action creator returns expected action', (t) => {

    const expected = {
        type: DELETE_PHOTO_SUCCESS,
        isFetching: false
    };

    const actual = deletePhotoSuccess();

    t.deepEqual(actual, expected);
    t.end();
});

test('deletePhotoFailure action creator returns expected action', (t) => {

    const error = {
        message: "Whoops"
    };
    const expected = {
        type: DELETE_PHOTO_FAILURE,
        isFetching: false,
        error
    };

    const actual = deletePhotoFailure(error);

    t.deepEqual(actual, expected);
    t.end();
});


/********
SHARE PHOTO ACTIONS
********/

test('sharePhoto async action creator returns expected action', (t) => {
    let actual;
    const { dispatch, queue } = createThunk();
    var photoURL = 'http://www.aws.com/photolocation.jpg';
    dispatch(sharePhoto(photoURL));

    [{ ...actual }] = queue;

    const expected = {
        type: SHARE_PHOTO_REQUEST,
        isFetching: true
    };
    t.deepEqual(actual, expected, "sharePhoto returns the SHARE_PHOTO_REQUEST action");
    t.end();
});


test('sharePhotoRequest action creator returns expected action', (t) => {

    const expected = {
        type: SHARE_PHOTO_REQUEST,
        isFetching: true
    };
    const actual = sharePhotoRequest();

    t.deepEqual(actual, expected);
    t.end();
});

test('sharePhotoSuccess action creator returns expected action', (t) => {

    const expected = {
        type: SHARE_PHOTO_SUCCESS,
        isFetching: false
    };

    const actual = sharePhotoSuccess();

    t.deepEqual(actual, expected);
    t.end();
});

test('sharePhotoFailure action creator returns expected action', (t) => {

    const error = {
        message: "Whoops"
    };
    const expected = {
        type: SHARE_PHOTO_FAILURE,
        isFetching: false,
        error
    };

    const actual = sharePhotoFailure(error);

    t.deepEqual(actual, expected);
    t.end();
});
