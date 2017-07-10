import React from 'react';
import Navbar from './general/navbar.jsx';
import Message from './general/message.jsx';
import { connectAlert } from './Alert';

const App = ({ location, children, error }) => {

    let currentLocation;
    if (!process.env.DEVELOPMENT) {
        currentLocation = location.pathname;
    } else {
        currentLocation = 'test';
    }

    let online = window.navigator.onLine;
    
    renderAlert = () => {
        setTimeout(() => {
          this.props.alertWithType('error', 'No connection', 'You are not connected to Internet!');
        }, 2000);
    }
    
    return (
        <div>
            {
                !online && this.renderAlert()
                // <Message extraClass="offline" text="Oops! No internet connection..." />
                
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
