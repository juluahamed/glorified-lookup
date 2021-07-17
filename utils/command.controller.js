const {setValue, getValue, delValue, incValue, incByValue, compactQueries } = require('./db.controller')

let multiMode = false;
let currentInstructionStack = [];

// Parse the input and send to corresponding processor functions
// TODO: Malformed input edge cases
const commandParser = (commandString, connObj) => {
    let response = null;
    const processedCommands = commandString.split(' ')

    if (processedCommands[0] === 'EXEC' || processedCommands[0] === 'DISCARD') {
        connObj.multiMode = false
    }

    if (connObj.multiMode) {
        connObj.currentInstructionStack.push(commandString)
        return null
    }
    
    switch (processedCommands[0]) {
        case 'SET':
            response = setValue(processedCommands[1], processedCommands[2],connObj)
            return response
        case 'GET':
            response = getValue(processedCommands[1])
            return response
        case 'DEL':
            response = delValue(processedCommands[1],connObj)
            return response
        case 'INCR':
            response = incValue(processedCommands[1],connObj)
            return response
        case 'INCRBY':
            response = incByValue(processedCommands[1], processedCommands[2], connObj)
            return response
        case 'MULTI':
            connObj.multiMode = true;
            return `Enabling multi line commands`
        case 'EXEC':
            connObj.responseArray = [];
            connObj.multiMode = false
            for (let i=0; i<connObj.currentInstructionStack.length; i++) {
                const response = commandParser(connObj.currentInstructionStack[i], connObj);
                connObj.responseArray.push(response)
            }
            connObj.currentInstructionStack = [];
            return JSON.stringify(connObj.responseArray)
        case 'DISCARD':
            connObj.currentInstructionStack = [];
            return 'Discarding multi line commands'
        case 'COMPACT':
            response = compactQueries(connObj)
            return response
        default:
            console.log('Oops...')
            return response
    }
}

module.exports = {
    commandParser,
}