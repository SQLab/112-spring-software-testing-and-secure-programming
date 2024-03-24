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

test('MailSystem send should be controllable', () => {
    const mailSystem = new MailSystem();
    const name = 'John';
    const context = 'test';

    // Override Math.random to control the success and failure
    const originalRandom = Math.random;

    Math.random = () => 0.6;  // Simulate success
    assert.strictEqual(mailSystem.send(name, context), true, 'Mail should be sent successfully');

    Math.random = () => 0.4;  // Simulate failure
    assert.strictEqual(mailSystem.send(name, context), false, 'Mail should fail to send');

    Math.random = originalRandom;  // Restore original function
});

test('Application getNames', async () => {
    const app = new Application();
    const [people, selected] = await app.getNames();
    assert(people.length > 0, 'Should return a non-empty people array');
    assert.strictEqual(selected.length, 0, 'Selected array should be empty');
});

test('Application selectNextPerson and notifySelected', async () => {
    const app = new Application();
    await app.getNames();  // Load names from file

    const personBefore = app.selectNextPerson();
    assert(personBefore, 'Should return a person before all are selected');

    // Simulate selecting all persons
    while (app.selectNextPerson() !== null) {}

    const personAfter = app.selectNextPerson();
    assert.strictEqual(personAfter, null, 'Should return null when all people are selected');

    // Mock the send method to always succeed
    app.mailSystem.send = () => true;
    app.notifySelected();
    // You can add more assertions here to check if notifySelected works correctly
});

test('selectNextPerson should handle all selected', async () => {
    const app = new Application();
    await app.getNames();  // Load names from file

    // Select all persons
    while (app.selectNextPerson() !== null) {}

    const person = app.selectNextPerson();
    assert.strictEqual(person, null, 'Should return null when all people are selected');
});

