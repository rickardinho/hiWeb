'use strict';

import test from 'tape';
import React from 'react';
import TestUtils, { renderIntoDocument, findRenderedDOMComponentWithTag } from 'react-addons-test-utils';
import AppContainer from '../../src/js/containers/app-container.js';
import { initStore } from '../../src/js/init-store.js';

test('App displays any errors in state', (t) => {

    const initialState = {
        user: {
            error: {
                status: 500,
                data: {
                    error: "Internal server error",
                    message: "Something went wonky donkey"
                }
            }
        }
    };
    const store = initStore(initialState);
    const renderedApp = renderIntoDocument(<AppContainer store={ store } />);
    const textNode = findRenderedDOMComponentWithTag(renderedApp, 'h3');
    const errorMessageExists = textNode.textContent.indexOf("Error") !== -1;

    t.ok(errorMessageExists, "Error from user state displays correctly");
    t.end();
});
