const remote = require('./remote');

let io = null;
let sensorsInterval = null;

const initializeSockets = (server) => {
    io = require('socket.io')(server);

    io.origins('http://localhost:3000');

    io.on('connect', (socket) => {
        console.log('CLIENT CONNECTED');
        socket.on('keys-changed', (data) => {
            remote.onKeysChanged(data);
        });
        remote.emiterInit(socket);
    });
}


module.exports =  {
    init: initializeSockets,
}