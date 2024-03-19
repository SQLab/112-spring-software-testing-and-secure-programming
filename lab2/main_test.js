const test = require('node:test');
const assert = require('assert');
const fs = require('fs');
const { Application, MailSystem } = require('./main');

function mockReadFile() {
    test.mock.method(fs, 'readFile', (file, options, callback) => {
        callback(null, 'alpha\nbeta\ngama');
    });
}

function mockRandom(returnValue) {
    test.mock.method(Math, 'random', () => returnValue);
}

function testMailSystemWrite() {
    const ms = new MailSystem();
    assert.strictEqual(ms.write('alpha'), 'Congrats, alpha!');
    assert.strictEqual(ms.write(null), 'Congrats, null!');
    assert.strictEqual(ms.write(48763), 'Congrats, 48763!');
}

function testMailSystemSend() {
    const ms = new MailSystem();
    const name = 'alpha';
    mockRandom(0.6); 
    assert.strictEqual(ms.send(name, 'success'), true);
    mockRandom(0.4); 
    assert.strictEqual(ms.send(name, 'fail'), false);
}

async function testApplicationGetNames() {
    mockReadFile();
    const app = new Application();
    const expectedNames = ['alpha', 'beta', 'gama'];
    const names = await app.getNames();
    assert.deepStrictEqual(names, [expectedNames, []]);
}

async function testApplicationGetRandomPerson() {
    const app = new Application();
    await app.getNames();
    mockRandom(0);
    assert.strictEqual(app.getRandomPerson(), 'alpha');
    mockRandom(0.4);
    assert.strictEqual(app.getRandomPerson(), 'beta');
    mockRandom(0.7);
    assert.strictEqual(app.getRandomPerson(), 'gama');
}

async function testApplicationSelectNextPerson() {
    const app = new Application();
    await app.getNames();
    app.selected = ['alpha'];
    let cnt = 0;
    test.mock.method(app, 'getRandomPerson', () => app.names[cnt++]);
    assert.strictEqual(app.selectNextPerson(), 'beta');
    assert.deepStrictEqual(app.selected, ['alpha', 'beta']);
    assert.strictEqual(app.selectNextPerson(), 'gama');
    assert.deepStrictEqual(app.selected, ['alpha', 'beta', 'gama']);
    assert.strictEqual(app.selectNextPerson(), null);
}

async function testApplicationNotifySelected() {
    const app = new Application();
    app.people = ['alpha', 'beta', 'gama'];
    app.selected = ['alpha', 'beta', 'gama'];
    app.mailSystem.send = test.mock.fn(app.mailSystem.send);
    app.mailSystem.write = test.mock.fn(app.mailSystem.write);
    app.notifySelected();
    assert.strictEqual(app.mailSystem.send.mock.calls.length, 3);
    assert.strictEqual(app.mailSystem.write.mock.calls.length, 3);
}

test('Mock readFile', mockReadFile);
test('MailSystem : write()', testMailSystemWrite);
test('MailSystem : send()', testMailSystemSend);
test('Application : getNames()', testApplicationGetNames);
test('Application : getRandomPerson()', testApplicationGetRandomPerson);
test('Application : selectNextPerson()', testApplicationSelectNextPerson);
test('Application : notifySelected()', testApplicationNotifySelected);
