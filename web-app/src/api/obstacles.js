import socket from './web-socket';

export const startListeningForTheObstacles = (listener) => {
    socket.on('obstacles', listener);
}

export const stopListeningForTheObstacles = (listener) => {
    socket.off('obstacles', listener);
}