import socket from './web-socket';

export default function sendKeyInfo(keys) {
    socket.emit('keys-changed', keys);
}