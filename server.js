const net = require('net');
const {commandParser} = require('./utils/command.controller');
const {dataStore} = require('./utils/db.controller')

//define host and port to run the server
const port = 9736;
const host = '127.0.0.1';

//Create an instance of the server
const server = net.createServer(onClientConnection);
//Start listening with the server on given port and host.
server.listen(port,host,function(){
   console.log(`Server started on port ${port} at ${host}`); 
});



//Declare connection listener function
function onClientConnection(sock) {
    //Log when a client connnects.
    console.log(`${sock.remoteAddress}:${sock.remotePort} Connected`);
     //Listen for data from the connected client.
    sock.on('data',function(data){
        //Log data from the client
        console.log(`${sock.remoteAddress}:${sock.remotePort} Says : ${data} `);
        //Send back the data to the client.

        const result = commandParser(`${data}`)
        sock.write(`${result}`);

    });

    //Handle client connection termination.
    sock.on('close',function() {
        console.log(`${sock.remoteAddress}:${sock.remotePort} Terminated the connection`);
    });

    //Handle Client connection error.
    sock.on('error',function(error){
        console.error(`${sock.remoteAddress}:${sock.remotePort} Connection Error ${error}`);
    });
};