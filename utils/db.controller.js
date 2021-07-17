// All db data functionalies

let dataStore = {};
let clientState = {};

const setValue = (key, value, connObj)=> {
    dataStore[key] = value
    connObj.clientState[key] = value
    return null
}

const getValue = (key)=> {
    if (dataStore[key]) {
        return dataStore[key]
    } else {
        return null
    }
}

const delValue = (key,connObj)=> {
    if (dataStore[key]) {
        const response = `${key}:${dataStore[key]}`
        delete dataStore[key]
        delete connObj.clientState[key] 
        return response
    } else {
        return null
    }
}


const incValue = (key, connObj)=> {
    if (dataStore[key]) {
        
        if (!dataStore[key].isNaN) {
            dataStore[key] = Number(dataStore[key]) + 1;
            connObj.clientState[key] = dataStore[key]
            return dataStore[key]
        } else {
            return 'Cannot increment non numeric values'
        }
        
    } else {
        dataStore[key] = 1
        connObj.clientState[key]  = 1
        return `${key}: ${dataStore[key]}`
    }
}

const incByValue = (key, increment, connObj)=> {
    if (dataStore[key]) {
        
        if (!dataStore[key].isNaN) {
            dataStore[key] =  Number(dataStore[key]) + Number(increment)
            connObj.clientState[key] = dataStore[key]
            return dataStore[key]
        } else {
            return 'Cannot increment non numeric values'
        }
        
    } else {
        dataStore[key] = increment
        connObj.clientState[key] = dataStore[key]
        return `${key}: ${dataStore[key]}`
    }
}

const compactQueries = (connObj) => {
    const compactStatements = []
    for (const [key, value] of Object.entries(connObj.clientState)) {
        compactStatements.push(`SET ${key} ${value}`);
    }
    connObj.clientState = {}
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