# glorified-lookup
An in memory db in nodejs.

## Requirements
- Nodejs version > 8


## TODOS & Future Scope
- Add persistance for crashes and reboot
- Add  malformed Input commands handling
- Add client connection object to handle issues with multiple clients connecting at the same time

## Assumptions
- Cascading/ nesting MULTI commands is not implemented. 


## Installation && Usage

- Run `npm install` to install dependencies
- Run `node server.js` to initialise the server (Fix the port value on `server.js`, default: 9736)
- Run `node client.js` to initialise the client (Fix the port value on `client.js`,  default: 9736)


## Command Supported
1. GET key
2. SET key value
3. DEL key
4. INCR key
5. INCRBY key increment
6. MULTI
7. EXEC
8. DISCARD
9. COMPACT
10. DISCONNECT

## Testing
- Run `npm run test`

![Screenshot from 2021-07-16 06-29-04](https://user-images.githubusercontent.com/6171567/125876020-60b0ae9d-1414-4509-a1e5-edfd1081e548.png)

