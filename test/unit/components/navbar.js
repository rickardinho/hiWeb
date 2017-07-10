import test from 'tape';
import React from 'react';
import { renderIntoDocument, scryRenderedDOMComponentsWithClass, Simulate } from 'react-addons-test-utils';
import shallowRenderer from '../../utils/shallowRenderer.js';
import Navbar from '../../../src/js/components/general/navbar.jsx';


test('Navbar shallow renders correctly', (t) => {

    const shallow = shallowRenderer(<Navbar />);
    t.equal(shallow.props.children.length, 5, 'Navbar has 5 children');
    t.end();
});
