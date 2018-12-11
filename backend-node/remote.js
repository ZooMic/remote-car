const serialPort = require('./serial-port');
const keymapper = require('./key-mapper');

let port = null;
const onKeysChanged = (keys) => {
    console.log("KEYS", keys);
    port.write(keymapper.mapKeys(keys));
};

let currentSocket = null;
const emitObstacles = (obstacle) => {
    if (obstacle) {
        currentSocket.emit('obstacles', [obstacle]);
    }
};

let isObstacleEmiterInit = false;
const emiterInit = (socket) => {
    currentSocket = socket;
    port = serialPort.initPort('COM5', emitObstacles);
    if (!isObstacleEmiterInit) {
        isObstacleEmiterInit = true;
        emitObstacles();
    }
};

module.exports = {
    onKeysChanged,
    emiterInit,
};