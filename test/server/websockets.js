import test from 'tape';
import { feedSocket } from '../../src/js/socket.js';
import { server } from '../utils/initDB.js';

test('A socket is created under `/feed` namespace', (t) => {

    t.ok(feedSocket.nsp.indexOf('/feed') > -1, '`/feed` namespace exists');
    t.end();
});

test('Socket port matches the server port', (t) => {

    const socketPort = feedSocket.nsp.match(/(?:)\d{2,4}/)[0];
    const serverPort = server.info.uri.match(/(?:)\d{2,4}/)[0];

    t.equal(socketPort, serverPort, `socket connected to the correct server port ${serverPort}`);
    t.end();
});
