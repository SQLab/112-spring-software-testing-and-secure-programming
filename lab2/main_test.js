const test = require('node:test');
const assert = require('assert');
const fs = require('fs');
test.mock.method(fs, 'readFile', (file, options, callback) => {
    callback(null, 'alpha\nbeta\ngama');
});
const { Application, MailSystem } = require('./main');

// TODO: write your tests here
// Remember to use Stub, Mock, and Spy when necessary


test('Test MailSystem : write()', () => {
    const ms = new MailSystem();
    assert.strictEqual(ms.write('alpha'), 'Congrats, alpha!');
});

test('Test MailSystem : send()', () => {
    const ms = new MailSystem();
    const name = 'alpha';
    test.mock.method(Math, 'random', () => 0.6);
    assert.strictEqual(ms.send(name, 'success'), true);
    test.mock.method(Math, 'random', () => 0.4);
    assert.strictEqual(ms.send(name, 'fail'), false);
});

test('Test Application : getNames()', async () => {
    const app = new Application();
    const name_list = ['alpha', 'beta', 'gama'];
    const names = await app.getNames();
    assert.deepStrictEqual(names, [name_list, []])
});

test('Test Application : getRandomPerson()', async (test) => {
    const app = new Application();
    const names = await app.getNames();
    test.mock.method(Math, 'random', () => 0);
    assert.strictEqual(app.getRandomPerson(), 'alpha');
    test.mock.method(Math, 'random', () => 0.4);
    assert.strictEqual(app.getRandomPerson(), 'beta');
    test.mock.method(Math, 'random', () => 0.7);
    assert.strictEqual(app.getRandomPerson(), 'gama');
});

test('Test Application : selectNextPerson()', async (test) => {
    const app = new Application();
    const names = await app.getNames();
    test.mock.method(Math, 'random', () => 0);
    assert.strictEqual(app.selectNextPerson(), 'alpha');
    test.mock.method(Math, 'random', () => 0.4);
    assert.strictEqual(app.selectNextPerson(), 'beta');
    test.mock.method(Math, 'random', () => 0.7);
    assert.strictEqual(app.selectNextPerson(), 'gama');

});

test('Test Application : notifySelected()', async (test) => {
    const app = new Application();
    const names = await app.getNames();
    test.mock.method(Math, 'random', () => 0);
    assert.strictEqual(app.selectNextPerson(), 'alpha');
    test.mock.method(Math, 'random', () => 0.4);
    assert.strictEqual(app.selectNextPerson(), 'beta');
    test.mock.method(Math, 'random', () => 0.7);
    assert.strictEqual(app.selectNextPerson(), 'gama');
    app.mailSystem.send = test.mock.fn(app.mailSystem.send);
    app.mailSystem.write = test.mock.fn(app.mailSystem.write);
    app.notifySelected();
    assert.strictEqual(app.mailSystem.send.mock.calls.length, 3);
    assert.strictEqual(app.mailSystem.write.mock.calls.length, 3);
});
