// FIX CODE BELOW

const onKeysChanged = (keys) => {
    console.log("KEYS", keys);
    // TODO - fill with remote logic
};

let currentSocket = null;
const emitObstacles = () => {
    // TODO - fill with on obstacle changed logic
    // socket.emit('obstacles', [{angle, length}])
    
    setInterval(() => { // interval probably to be removed
        const obstacle1 = { // current handled objects
            angle: Math.random() * 360,
            length: Math.random() * 100,
        };
        currentSocket.emit('obstacles', [obstacle1]);
        console.log('EMITED OBSTACLE', [obstacle1]);
    }, 5000);
};

// FIX CODE ABOVE

let isObstacleEmiterInit = false;
const emiterInit = (socket) => {
    currentSocket = socket;
    if (!isObstacleEmiterInit) {
        isObstacleEmiterInit = true;
        emitObstacles();
    }
};

module.exports = {
    onKeysChanged,
    emiterInit,
};