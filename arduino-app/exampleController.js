const SerialPort = require('serialport')

//Example program ordering Arduino to move forward-right

const port = new SerialPort('COM5', {
        baudRate: 9600,  
        dataBits: 8, 
        parity: 'none', 
        stopBits: 1, 
        flowControl: false 
    },
    (err) => {
        if (err) {
        return console.log('Error: ', err.message)
        }
    });

  port.on("open", function(){
    console.log("port opened");
    setTimeout(function(){
        port.write("R");
        port.write("F");
    },5000);
});

return;
