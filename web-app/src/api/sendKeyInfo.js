import socket from './web-socket';

export default function sendKeyInfo(keys) {
    console.log('SEND KEY INFO', keys);
    socket.emit('keys-changed', keys);
}