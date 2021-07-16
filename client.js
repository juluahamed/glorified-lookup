const net = require('net');
const prompt = require('prompt');

//define the server port and host
const port = 9736;
const host = '127.0.0.1';
const readline = require('readline');
    

const commandArrays = ['SET', 'MULTI', 'GET', 'DEL', 'INCR', 'INCRBY', 'EXEC', 'DISCARD', 'COMPACT', 'DISCONNECT']
let multiMode = false


//Create an instance of the socket client.
const client = new net.Socket();

//Connect to the server using the above defined config.
client.connect(port,host,function(){
   console.log(`Connected to server on ${host}:${port}`);
   rl.prompt()
});

//Add a data event listener to handle data coming from the server
client.on('data',function(data){
    const serverResp  = `${data}`
    if (serverResp != "null") {
        console.log(serverResp)
    }
   rl.prompt()
});

//Add Client Close function
client.on('close',function(){
   console.log('Connection Closed');
});

//Add Error Event Listener
client.on('error',function(error){
   console.error(`Connection Error ${error}`); 
});

// Basic sanitation of the input 
const sanitizeInput = (line) => {
    let success = false
    const trimmmedInput = line.trim();
    if (trimmmedInput) {
        const commands = trimmmedInput.split(' ')
        if (commandArrays.includes(commands[0])) {
            success =  trimmmedInput
        }
    }
    return success
}


rl = readline.createInterface(process.stdin, process.stdout);

rl.setPrompt('$> ');
rl.prompt();

rl.on('line', async function(line) {
    const sanitizedString = sanitizeInput(line)

    if (sanitizedString.split(' ')[0] === 'DISCONNECT') {
        console.log('Gracefully disconnecting...')
        client.destroy()
        process.exit(0)
    }
    
    if (sanitizedString) {
        if (sanitizedString.split(' ')[0] === 'MULTI') {
            multiMode = true
        }
        if (sanitizedString.split(' ')[0] === 'EXEC' || sanitizedString.split(' ')[0] === 'DISCARD') {
            multiMode = false
        }
        client.write(sanitizedString)
    } else {
        console.log('Not a valid command :(');
    }

    // give the client visual cue about the MULTI command mode
    if (multiMode) {
        rl.setPrompt('$[MULTI]> ');
    } else {
        rl.setPrompt('$> ');
    }
    rl.prompt();

}).on('close', function() {
    process.exit(0);
});
