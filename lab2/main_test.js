const test = require('node:test');
const assert = require('assert');
const fs = require('fs').promises;
const { Application, MailSystem } = require('./main');

test.before(async () => {
    await fs.writeFile('name_list.txt', 'John\nAlice\nBob');
});

test.after(async () => {
    await fs.unlink('name_list.txt');
});

test('write() should return context', () => {
    const mailSystem = new MailSystem();
    const context = mailSystem.write('John');
    assert.strictEqual(context, 'Congrats, John!', 'Write method should return the correct context');
});

test('MailSystem send success', () => {
    const mailSystem = new MailSystem();
    const name = 'John';
    const context = 'test';
    const originalRandom = Math.random;
    Math.random = () => 0.6;
    const success = mailSystem.send(name, context);
    Math.random = originalRandom;
    assert.strictEqual(success, true, 'Mail should be sent successfully as Math.random() > 0.5');
});

test('MailSystem send failure', () => {
    const mailSystem = new MailSystem();
    const name = 'John';
    const context = 'test';
    const originalRandom = Math.random;
    Math.random = () => 0.4;
    const success = mailSystem.send(name, context);
    Math.random = originalRandom;
    assert.strictEqual(success, false, 'Mail should fail as Math.random() < 0.5');
});

test('Application getNames', async () => {
    const app = new Application();
    const [people, selected] = await app.getNames();
    assert.strictEqual(people.length > 0, true, 'Should return a non-empty people array');
    assert.strictEqual(selected.length, 0, 'Selected array should be empty');
});

test('Application selectNextPerson and notifySelected', async () => {
    const app = new Application();
    await app.getNames();  // Load names from file
    const person = app.selectNextPerson();
    assert.ok(person, 'Should return a person');
    app.notifySelected();  // We assume this works correctly, but you should ideally check the output
});

test('selectNextPerson should return null when all are selected', async () => {
    const app = new Application();
    await app.getNames();  // Load names from file
    while (app.selectNextPerson() !== null) {}  // Select all people
    const person = app.selectNextPerson();
    assert.strictEqual(person, null, 'Should return null when all people are selected');
});


