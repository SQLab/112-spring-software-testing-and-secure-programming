const test = require('node:test');
const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { Application, MailSystem } = require('./main');


test('MailSystem functionality', () => {
    const mailSystem = new MailSystem();
    const context = mailSystem.write('John');
    assert.strictEqual(context, 'Congrats, John!');

    t.mock.method(Math, 'random', () => 1);
    let isSend = mailSystem.send('Joy', "test mail");
    assert.strictEqual(isSend, true);

    t.mock.method(Math, 'random', () => 0.4);
    isSend = mailSystem.send('Joy', "test mail");
    assert.strictEqual(isSend, false);
});

test('Application person selection functionality', async () => {
    const tempFilePath = path.join('name_list.txt');
    fs.writeFileSync(tempFilePath, 'Alice\nBob\nCharlie');
    const app = new Application();
    const [people] = await app.getNames(tempFilePath);
    assert.deepStrictEqual(people, ['Alice', 'Bob', 'Charlie']);

    app.people = ['Alice', 'Bob', 'Charlie'];
    app.selected = ['Alice', 'Bob'];
    let result = app.selectNextPerson();
    assert.strictEqual(result, 'Charlie');

    Math.random = () => 0.5;
    const randomPerson = app.getRandomPerson();
    assert(app.people.includes(randomPerson));

    app.selected = ['Alice', 'Bob', 'Charlie'];
    result = app.selectNextPerson();
    assert.strictEqual(result, null);
});

test('should notify selected persons', () => {
    const mailSystem = new MockMailSystem();
    const app = new Application();
    app.mailSystem = mailSystem;
    app.selected = ['Alice', 'Bob', 'Charlie'];
    app.notifySelected();
    assert.strictEqual(mailSystem.writeCallCount, 3);
    assert.strictEqual(mailSystem.sendCallCount, 3);
});
