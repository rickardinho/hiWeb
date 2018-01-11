import React from 'react';
import { render } from 'react-dom';
import { PureGridProvider } from 'react-pure-grid';

const Login = () => (
  <div>
    <div className="App">
      <div className="App-header">
        <h2>Welcome to Hi Web</h2>
      </div>
      <p className="App-intro">
        To get started, blah blah.
      </p>
    </div>
  </div>
);

render(<Login />, document.getElementById('app'));
