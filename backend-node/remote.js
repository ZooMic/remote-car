const serialPort = require('./serial-port');
const keymapper = require('./key-mapper');

let port = null;

const onKeysChanged = (keys) => {
    console.log('keys',keys); 
    port.write(keymapper.mapKeys(keys));
};

let currentSocket = null;
const emitObstacles = (obstacles) => {
    if (obstacles) {
        currentSocket.emit('obstacles', obstacles);
         console.log(obstacles);
    }
};

let isObstacleEmiterInit = false;
const emiterInit = (socket) => {
    currentSocket = socket;

    if (!port) {
        port = serialPort.initPort('COM5', emitObstacles);        
    }  
    
    if (!isObstacleEmiterInit) {
        isObstacleEmiterInit = true;
        // emitObstacles();
    }
};

module.exports = {
    onKeysChanged,
    emiterInit,
};