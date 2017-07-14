import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, browserHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';

import AppContainer from './containers/app-container.js';
import FarmSummaryContainer from './containers/farmSummary-container.js';
import FarmDetailContainer from './containers/farmDetail-container.js';
import LoginContainer from './containers/login-container.js';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
require('../scss/main.scss');
require('../scss/font-awesome/font-awesome.scss');


import { store } from './init-store.js';


const routes = (
    <Route path='/' component={ AppContainer }>

        <IndexRoute component={ LoginContainer } />

        <Route path='/farmSummary'
               component={ FarmSummaryContainer }
               onEnter={ initialiseAppState } />

        <Route path='/farmDetails/:farmID'
               component={ FarmDetailContainer }
               onEnter={ fetchFarm } />

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
registerServiceWorker()
