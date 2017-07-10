'use strict';

import jsdom from 'jsdom';

const options = {
    cookie: "sparkID=12345678; path=/"
};

const doc = jsdom.jsdom('<!doctype html><html><body></body></html>', options);
const win = doc.defaultView;

global.document = doc;
global.window = win;

Object.keys(window).forEach( (key) => {

    if (!(key in global)) {

        global[key] = window[key];
    }
});
