const {commandParser} = require('../utils/command.controller');

test('COMPACT command', () => {
    commandParser('SET h 3')
    commandParser('SET t 4')
    commandParser('DEL h 3')
    expect(commandParser('COMPACT')).toBe("SET t 4")
});

test('SET a key', () => {
  expect(commandParser('SET y 3')).toBe(null);
});

test('GET a key', () => {
    expect(commandParser('GET y')).toBe("3");
});

test('DEL a key', () => {
    expect(commandParser('DEL y')).toBe("y:3");
});

test('INCR a new key', () => {
    expect(commandParser('INCR z')).toBe("z: 1");
});

test('INCR an existing key', () => {
    expect(commandParser('INCR z')).toBe(2);
});

test('INCRBY a new key', () => {
    expect(commandParser('INCRBY z 10')).toBe(12);
});

test('INCRBY existing key', () => {
    expect(commandParser('INCRBY z 10')).toBe(22);
});


test('MULTI Command exec', () => {
    commandParser('MULTI')
    commandParser('SET h 3')
    commandParser('SET t 4')
    commandParser('EXEC')
    expect(commandParser('GET h')).toBe("3")
    expect(commandParser('GET t')).toBe("4")
});


test('MULTI Command discard', () => {
    commandParser('SET h 3')
    commandParser('MULTI')
    commandParser('SET t 4')
    commandParser('DISCARD')
    expect(commandParser('GET h')).toBe("3")
});




