import React from 'react';
import { render } from 'react-dom';
import { PureGridProvider } from 'react-pure-grid';
import Table from './general/Table';

const farmSummary = () => (
  <PureGridProvider gutterSize={4}>
    <Table />
  </PureGridProvider>
);

render(<farmSummary />, document.getElementById('app'));
