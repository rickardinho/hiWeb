import React from 'react';
import { render } from 'react-dom';
import { PureGridProvider } from 'react-pure-grid';
import Table from './general/Table';

const farmDetail = () => (

  <div>
    // <PureGridProvider gutterSize={4}>
      // <Table />
    // </PureGridProvider>
  </div>

);

render(<farmDetail />, document.getElementById('app'));
