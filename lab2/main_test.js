const testUtil = require('node:test');
const assert = require('assert');
const fs = require('fs');

// Mock the file containing names
testUtil.mock.method(fs, 'readFile', (file, options, callback) => {
    callback(null, 'Alice\nBob\ncat');
});

const { Application, MailSystem } = require('./main');

testUtil('MailSystem_write()', () => {
    const mailSystem = new MailSystem();
    assert.strictEqual(mailSystem.write('Alice'), 'Congrats, Alice!');
    assert.strictEqual(mailSystem.write(202), 'Congrats, 202!');
    assert.strictEqual(mailSystem.write(null), 'Congrats, null!');
});

testUtil('MailSystem_send()', () => {
    const mailSystem = new MailSystem();
    const name = 'Alice';
    testUtil.mock.method(Math, 'random', () => 0.9);
    assert.strictEqual(mailSystem.send(name, 'success'), true);
    testUtil.mock.method(Math, 'random', () => 0.2);
    assert.strictEqual(mailSystem.send(name, 'fail'), false);
});

testUtil('Application_getNames()', async () => {
    const app = new Application();
    const nameList = ['Alice', 'Bob', 'cat'];
    const [names, selected] = await app.getNames();
    assert.deepStrictEqual(names, nameList);
    assert.deepStrictEqual(selected, []);
});

testUtil('Application_getRandomPerson()', async () => {
    const app = new Application();
    const [names] = await app.getNames();                          
    const randomPerson = app.getRandomPerson();
});

testUtil('Application_selectNextPerson()', async () => {
    const app = new Application();
    const [names] = await app.getNames();
    app.selected = ['Alice'];
    let count = 0;
    testUtil.mock.method(app, 'getRandomPerson', () => names[count++]);
    assert.strictEqual(app.selectNextPerson(), 'Bob');
    assert.deepStrictEqual(app.selected, ['Alice', 'Bob']);
    assert.strictEqual(app.selectNextPerson(), 'cat');
    assert.deepStrictEqual(app.selected, ['Alice', 'Bob', 'cat']);
    assert.strictEqual(app.selectNextPerson(), null);
});

testUtil('Application_notifySelected()', async () => {
    const app = new Application();
    const [names] = await app.getNames();
    app.selected = names.slice(); // Select all names initially
    app.mailSystem.send = testUtil.mock.fn(app.mailSystem.send);
    app.mailSystem.write = testUtil.mock.fn(app.mailSystem.write);
    app.notifySelected();
    assert.strictEqual(app.mailSystem.send.mock.calls.length, names.length);
    assert.strictEqual(app.mailSystem.write.mock.calls.length, names.length);
});
