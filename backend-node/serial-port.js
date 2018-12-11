const SerialPort = require('serialport')
const Delimiter = require('@serialport/parser-delimiter')

const initPort = ( portName, obstacleCallback ) => {

    const port = new SerialPort(portName, {
        baudRate: 9600,  
        dataBits: 8, 
        parity: 'none', 
        stopBits: 1, 
        flowControl: false 
    }, (err) => {
        console.log('Error: ', err.message);
    });

    port.on('open',() => {
        console.log("Serial port opened");

        const portWithParser = port.pipe(new Delimiter({ delimiter: '\n' }));

        portWithParser.on('data', (dataLine) => {
            const result = dataLine.split(':');
            const obstacle = {
                angle: result[0],
                distance: result[1]
            };
            obstacleCallback(obstacle);
        });
    });

    return initPort;
};

module.exports = {
    initPort
};