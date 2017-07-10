import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, browserHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import { requireAuthentication } from './requireAuthentication.jsx';
import validCookieExists from './lib/validCookieExists.js';
import { getUser } from './actions/user.js';
import { getEvent, resetEventState } from './actions/event.js';
import { getNotifications } from './actions/notifications.js';
import { getCalendar } from './actions/calendar.js';
import { clearCreateEvent } from './actions/create-event.js';


import AppContainer from './containers/app-container.js';
import LoginContainer from './containers/login-container.js';
import FeedContainer from './containers/feed-container.js';
import EventContainer from './containers/event-container.js';
import EditEventContainer from './containers/edit-event-container.js';
import CalendarContainer from './containers/calendar-container.js';
import AlbumsContainer from './containers/albums-container.js';
import CreateEventContainer from './containers/create-event/create-event-container.js';
import EventDetailsContainer from './containers/create-event/event-details-container.js';
import EventWhatContainer from './containers/create-event/event-what-container.js';
import EventWhereContainer from './containers/create-event/event-where-container.js';
import EventWhenContainer from './containers/create-event/event-when-container.js';
import ConfirmNewEventContainer from './containers/create-event/confirm-new-event-container.js';
import InviteFriendsContainer from './containers/create-event/invite-friends-container.js';
import ProfileContainer from './containers/profile-container.js';

require('../scss/main.scss');
require('../scss/font-awesome/font-awesome.scss');


import { store } from './init-store.js';

function initialiseAppState (nextState, replace, callback) {

    // catch if user is not authenticated
    // onEnter runs before requireAuthentication
    if (!validCookieExists()) {

        hashHistory.push('/');
    } else {

        if (!store.getState().user.id) {

            store.dispatch(getUser());
        }
    }

    callback();
}

function fetchCalendar (nextState, replace, callback) {

    // catch if user is not authenticated
    // onEnter runs before requireAuthentication
    if (!validCookieExists()) {

        hashHistory.push('/');
    } else {

        if (!store.getState().user.id) {

            store.dispatch(getUser());
        }
        store.dispatch(getCalendar());
    }

    callback();
}

function fetchEvent (nextState, replace, callback) {
    store.dispatch(resetEventState());
    store.dispatch(getEvent(nextState.params.eventID));
    callback();
}


function handleCreateEvent (nextState, replace, callback) {

    if (!validCookieExists()) {
        hashHistory.push('/');
    } else {

        if (!store.getState().user.id) {

            store.dispatch(getUser());
        }
    }
    store.dispatch(clearCreateEvent());
    callback();
}

const routes = (
    <Route path='/' component={ AppContainer }>

        <IndexRoute component={ LoginContainer } />

        <Route path='/albums'
               component={ requireAuthentication(AlbumsContainer) }
               onEnter={ fetchCalendar } />

        <Route path='/calendar'
               component={ requireAuthentication(CalendarContainer) }
               onEnter={ fetchCalendar } />

        <Route path='/feed'
               component={ requireAuthentication(FeedContainer) }
               onEnter={ initialiseAppState } />

        <Route path='/profile'
               component={ requireAuthentication(ProfileContainer) }
               onEnter={ initialiseAppState } />

        <Route path='/event/:eventID'
               component={ requireAuthentication(EventContainer) }
               onEnter={ fetchEvent } />

        <Route path='/edit/:eventID'
               component={ requireAuthentication(EditEventContainer) }
               onEnter={ fetchEvent } />




        <Route path='/create-event' component={ requireAuthentication(CreateEventContainer) } >
            <IndexRoute component={ requireAuthentication(EventDetailsContainer) }
                        onEnter={ handleCreateEvent } />

            <Route path='what' component={ requireAuthentication(EventWhatContainer) } />
            <Route path='where' component={ requireAuthentication(EventWhereContainer) } />
            <Route path='when' component={ requireAuthentication(EventWhenContainer) } />
            <Route path='invitees' component={ requireAuthentication(InviteFriendsContainer) } />
            <Route path='confirm' component={ requireAuthentication(ConfirmNewEventContainer) } />
        </Route>

    </Route>
);

ReactDOM.render(
    <Provider store={ store } >
        <Router onUpdate={() => window.scrollTo(0, 0)}
                history={ hashHistory }>
            { routes }
        </Router>
    </Provider>,
    document.getElementsByClassName('content')[0]
);
