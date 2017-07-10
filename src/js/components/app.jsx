import React from 'react';
import Navbar from './general/navbar.jsx';
import Message from './general/message.jsx';

const App = ({ location, children, error }) => {

    let currentLocation;
    if (!process.env.DEVELOPMENT) {
        currentLocation = location.pathname;
    } else {
        currentLocation = 'test';
    }

    let online = window.navigator.onLine;
    return (
        <div>
            {
                !online &&
                <Message extraClass="offline" text="Oops! No internet connection..." />
            }
            {
                error &&
                <h3>Error { error.status } { error.data.error }: { error.data.message }</h3>
            }
            { children }
            <Navbar currentLocation={ currentLocation } />
        </div>
    );
};

export default App;
