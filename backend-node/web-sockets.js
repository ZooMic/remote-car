
let io = null;
const initializeSockets = (server) => {
    io = require('socket.io')(server);

    io.origins('http://localhost:3000');

    io.on('connect', (socket) => {
        console.log('CLIENT CONNECTED');
        socket.on('keys-changed', (data) => {
            console.log('KEYS', data);
        });
    });
}


module.exports =  {
    init: initializeSockets,
}