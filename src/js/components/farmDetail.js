import React from 'react';
import {render} from 'react-dom';
import {PureGridProvider} from 'react-pure-grid';
import Table1 from './Table1';
 
const farmDetail = () => (
  <PureGridProvider gutterSize={4}>
    <Table1 />
  </PureGridProvider>
);
 
render(<farmDetail />, document.getElementById('app'));
