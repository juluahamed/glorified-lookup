// All db data functionalies

let dataStore = {};
let clientState = {};

const setValue = (key, value)=> {
    dataStore[key] = value
    clientState[key] = value
    return null
}

const getValue = (key)=> {
    if (dataStore[key]) {
        return dataStore[key]
    } else {
        return null
    }
}

const delValue = (key)=> {
    if (dataStore[key]) {
        const response = `${key}:${dataStore[key]}`
        delete dataStore[key]
        delete clientState[key] 
        return response
    } else {
        return null
    }
}


const incValue = (key)=> {
    if (dataStore[key]) {
        
        if (!dataStore[key].isNaN) {
            dataStore[key] = Number(dataStore[key]) + 1;
            clientState[key] = dataStore[key]
            return dataStore[key]
        } else {
            return 'Cannot increment non numeric values'
        }
        
    } else {
        dataStore[key] = 1
        clientState[key]  = 1
        return `${key}: ${dataStore[key]}`
    }
}

const incByValue = (key, increment)=> {
    if (dataStore[key]) {
        
        if (!dataStore[key].isNaN) {
            dataStore[key] =  Number(dataStore[key]) + Number(increment)
            clientState[key] = dataStore[key]
            return dataStore[key]
        } else {
            return 'Cannot increment non numeric values'
        }
        
    } else {
        dataStore[key] = increment
        clientState[key] = dataStore[key]
        return `${key}: ${dataStore[key]}`
    }
}

const compactQueries = () => {
    const compactStatements = []
    for (const [key, value] of Object.entries(clientState)) {
        compactStatements.push(`SET ${key} ${value}`);
    }
    clientState = {}
    return compactStatements.join(' \n ')
}


module.exports = {
    setValue,
    getValue,
    delValue,
    incValue,
    incByValue,
    compactQueries
}