'use strict';

import test from 'tape';
import client from '../server/db/init.js';

test('a test', (t) => {

    t.equal(1, 1, "one equals one");
    t.end();
});
