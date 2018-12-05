const SerialPort = require('serialport')
const Delimiter = require('@serialport/parser-delimiter')

//Example program ordering Arduino to move by inputting f,l,s on keyboard 

var stdin = process.stdin;

// without this, we would only get streams once enter is pressed
stdin.setRawMode( true );

// resume stdin in the parent process (node app won't quit all by itself
// unless an error or process.exit() happens)
stdin.resume();
stdin.setEncoding( 'utf8' );

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
    setTimeout(() => {
    },5000);
});

// on any data into stdin
stdin.on( 'data', ( key ) => {

     // ctrl-c ( end of text )
    if ( key === '\u0003' ) {
        process.exit();
    }
    port.write(key);
  });
  

const displayer = (chunk) => {
    console.log(chunk.toString());
}

const parser = port.pipe(new Delimiter({ delimiter: '\n' }));
parser.on('data', displayer);// emits data after every '\n'

return;
