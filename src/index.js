import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, browserHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';

import { store } from './js/init-store.js';
import AppContainer from './js/containers/app-container.js';
import FarmSummaryContainer from './js/containers/farmSummary-container.js';
import FarmDetailContainer from './js/containers/farmDetail-container.js';
import LoginContainer from './js/containers/login-container.js';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
require('./scss/main.scss');
require('./scss/font-awesome/font-awesome.scss');

const routes = (
    <Route path='/' component={ AppContainer }>

        <IndexRoute component={ LoginContainer } />

        <Route path='/farmSummary'
               component={ FarmSummaryContainer }
               />

        <Route path='/farmDetails/:farmID'
               component={ FarmDetailContainer }
               />

    </Route>
);

ReactDOM.render(
    <Provider store={ store } >
        <Router onUpdate={() => window.scrollTo(0, 0)}
                history={ hashHistory }>
            { routes }
        </Router>
    </Provider>,
    document.getElementsByClassName('root')[0]
);
registerServiceWorker();
