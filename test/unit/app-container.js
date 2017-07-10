'use strict';

import test from 'tape';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import AppContainer from '../../src/js/containers/app-container.js';

import shallowRenderer from '../utils/shallowRenderer.js';

test.skip('AppContainer contains an `h1`', (t) => {

    const rendered = shallowRenderer(<AppContainer />);

    t.deepEqual(rendered.props.children, <h1>This is the app container</h1>);

    const node = TestUtils.renderIntoDocument(<AppContainer />);
    const found = TestUtils.findRenderedDOMComponentWithTag(node, 'h1');

    t.equal(found.textContent, "This is the app container");
    t.end();
});
