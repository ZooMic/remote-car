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
                console.log(dataLine.toString());
                const result = dataLine.toString().split(":");
              
                const obstacle = {
                    front: result[0],
                    rightFront: result[1],
                    leftFront: result[2],
                    leftMiddle: result[3],
                    rightMiddle: result[4],
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