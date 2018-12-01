const SerialPort = require('serialport')
const Delimiter = require('@serialport/parser-delimiter')

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

port.on("open",() => {
    console.log("port opened");
    // setTimeout(function(){
    //     port.write("R");
    //     port.write("F");
    // },5000);
});

const displayer = (chunk) => {
    console.log(chunk.toString());
}

const parser = port.pipe(new Delimiter({ delimiter: '\n' }));
parser.on('data', displayer);// emits data after every '\n'

return;
