// FIX CODE BELOW

const onKeysChanged = (keys) => {
    console.log("KEYS", keys);
    // TODO - fill with remote logic
};

const emitObstacles = (socket) => {
    // TODO - fill with on obstacle changed logic
    // socket.emit('obstacles', [{angle, length}])
    
    setInterval(() => { // interval probably to be removed
        const obstacle1 = { // current handled objects
            angle: Math.random() * 360,
            length: Math.random() * 100,
        };
        socket.emit('obstacles', [obstacle1]);
        console.log('EMITED OBSTACLE', obstacle1);
    }, 5000);
};

// FIX CODE ABOVE

let isObstacleEmiterInit = false;
const emiterInit = (socket) => {
    if (!isObstacleEmiterInit) {
        isObstacleEmiterInit = true;
        emitObstacles(socket);
    }
};

module.exports = {
    onKeysChanged,
    emiterInit,
};