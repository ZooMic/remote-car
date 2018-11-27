import io from 'socket.io-client';

const socket = io('http://localhost:8000', { transport : ['websocket'] });


socket.on('connect', () => {
    console.log('Connected...');
});

export default socket;