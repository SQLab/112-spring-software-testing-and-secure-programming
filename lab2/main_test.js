const test = require('node:test');
const assert = require('assert');
const fs = require('fs');
test.mock.method(fs, 'readFile', (file, options, callback) => {
    callback(null, 'delta\nepsilon\nzeta');
});
const { Application, MailSystem } = require('./main');

test('Test MailSystem : write()', () => {
    const ms = new MailSystem();
    assert.strictEqual(ms.write('delta'), 'Congrats, delta!');
    assert.strictEqual(ms.write(undefined), 'Congrats, undefined!');
    assert.strictEqual(ms.write(12345), 'Congrats, 12345!');
});

test('Test MailSystem : send()', () => {
    const ms = new MailSystem();
    const name = 'delta';
    test.mock.method(Math, 'random', () => 0.7);
    assert.strictEqual(ms.send(name, 'success'), true);
    test.mock.method(Math, 'random', () => 0.3);
    assert.strictEqual(ms.send(name, 'fail'), false);
});

test('Test Application : getNames()', async () => {
    const app = new Application();
    const name_list = ['delta', 'epsilon', 'zeta'];
    const names = await app.getNames();
    assert.deepStrictEqual(names, [name_list, []])
});

test('Test Application : getRandomPerson()', async (test) => {
    const app = new Application();
    const names = await app.getNames();
    test.mock.method(Math, 'random', () => 0.1);
    assert.strictEqual(app.getRandomPerson(), 'delta');
    test.mock.method(Math, 'random', () => 0.5);
    assert.strictEqual(app.getRandomPerson(), 'epsilon');
    test.mock.method(Math, 'random', () => 0.9);
    assert.strictEqual(app.getRandomPerson(), 'zeta');
});

test('Test Application : selectNextPerson()', async (test) => {
    const app = new Application();
    const names = await app.getNames();
    app.selected = ['delta'];
    let cnt = 0;
    test.mock.method(app, 'getRandomPerson', () => {
        if (cnt <= names.length) { 
            return names[0][cnt++]; 
        }
    });
    assert.strictEqual(app.selectNextPerson(), 'epsilon');
    assert.deepStrictEqual(app.selected, ['delta', 'epsilon']);
    assert.strictEqual(app.selectNextPerson(), 'zeta');
    assert.deepStrictEqual(app.selected, ['delta', 'epsilon', 'zeta']);
    assert.strictEqual(app.selectNextPerson(), null);
});

test('Test Application : notifySelected()', async (test) => {
    const app = new Application();
    app.people = ['delta', 'epsilon', 'zeta'];
    app.selected = ['delta', 'epsilon', 'zeta'];
    app.mailSystem.send = test.mock.fn(app.mailSystem.send);
    app.mailSystem.write = test.mock.fn(app.mailSystem.write);
    app.notifySelected();
    assert.strictEqual(app.mailSystem.send.mock.calls.length, 3);
    assert.strictEqual(app.mailSystem.write.mock.calls.length, 3);
});
