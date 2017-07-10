import { combineReducers } from 'redux';
import auth from './auth.js';
import user from './user.js';
import calendar from './calendar.js';
import event from './event.js';
import notifications from './notifications.js';
import createEvent from './create-event.js';
import photos from './photos.js';


export default combineReducers({
    auth,
    user,
    calendar,
    event,
    notifications,
    createEvent,
    photos
});
