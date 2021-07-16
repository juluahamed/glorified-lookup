const {setValue, getValue, delValue, incValue, incByValue, compactQueries } = require('./db.controller')

let multiMode = false;
let currentInstructionStack = [];

// Parse the input and send to corresponding processor functions
// TODO: Malformed input edge cases
const commandParser = (commandString) => {
    let response = null;
    const processedCommands = commandString.split(' ')

    if (processedCommands[0] === 'EXEC' || processedCommands[0] === 'DISCARD') {
        multiMode = false
    }

    if (multiMode) {
        currentInstructionStack.push(commandString)
        return null
    }
    
    switch (processedCommands[0]) {
        case 'SET':
            response = setValue(processedCommands[1], processedCommands[2])
            return response
        case 'GET':
            response = getValue(processedCommands[1])
            return response
        case 'DEL':
            response = delValue(processedCommands[1])
            return response
        case 'INCR':
            response = incValue(processedCommands[1])
            return response
        case 'INCRBY':
            response = incByValue(processedCommands[1], processedCommands[2])
            return response
        case 'MULTI':
            multiMode = true;
            return `Enabling multi line commands`
        case 'EXEC':
            const responseArray = [];
            multiMode = false
            for (let i=0; i<currentInstructionStack.length; i++) {
                const response = commandParser(currentInstructionStack[i]);
                responseArray.push(response)
            }
            currentInstructionStack = [];
            return JSON.stringify(responseArray)
        case 'DISCARD':
            currentInstructionStack = [];
            return 'Discarding multi line commands'
        case 'COMPACT':
            response = compactQueries()
            return response
        default:
            console.log('Oops...')
            return response
    }
}

module.exports = {
    commandParser,
}