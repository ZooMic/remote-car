const SerialPort = require('serialport')
const Delimiter = require('@serialport/parser-delimiter')

const initPort = ( portName, obstacleCallback ) => {

    const port = new SerialPort(portName, {
        baudRate: 9600,  
        dataBits: 8, 
        parity: 'none', 
        stopBits: 1, 
        flowControl: false,
        autoOpen: false
    }, (err) => {
        console.log('Error: ', err.message);
    });

    port.open((err) => {
        if (err) {
          console.log('Error opening port: ', err.message)
        }
    })

    port.on('open',() => {
        console.log("Serial port opened");
        setTimeout(() => {
            const portWithParser = port.pipe(new Delimiter({ delimiter: '|' }));

            portWithParser.on('data', (dataLine) => {
                const result = dataLine.toString().split(":");
                const obstacle = {
                    angle: result[0],
                    distance: result[1]
                };
                obstacleCallback(obstacle);
            });
        },5000);
    });

    return port;
};

module.exports = {
    initPort
};