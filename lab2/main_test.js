const test = require('node:test');
const assert = require('assert');
const fs = require('fs');

test.mock.method(fs, 'readFile', (file, options, callback) => {
    callback(null, 'dave\nemily\nfrank');
});

const { Application, MailSystem } = require('./main');

// TODO: write your tests here
// Remember to use Stub, Mock, and Spy when necessary
test('MailSystem_write() with various names', () => {
    const mailSystem = new MailSystem();
    assert.strictEqual(mailSystem.write('dave'), 'Congrats, dave!');
    assert.strictEqual(mailSystem.write('emily'), 'Congrats, emily!');
    assert.strictEqual(mailSystem.write('frank'), 'Congrats, frank!');
    assert.strictEqual(mailSystem.write(null), 'Congrats, null!');
});

test('MailSystem_send() with different success rates', () => {
    const mailSystem = new MailSystem();
    const name = 'dave';
    test.mock.method(Math, 'random', () => 0.6);
    assert.strictEqual(mailSystem.send(name, 'success'), true);
    test.mock.method(Math, 'random', () => 0.4);
    assert.strictEqual(mailSystem.send(name, 'failure'), false);
});

test('Application_getNames() returns correct names and selected list', async () => {
    const application = new Application();
    const expectedNames = ['dave', 'emily', 'frank'];
    const [names, selected] = await application.getNames();
    assert.deepStrictEqual(names, expectedNames);
    assert.deepStrictEqual(selected, []);
});

test('Application_getRandomPerson() returns correct random person', async () => {
    const application = new Application();
    test.mock.method(application, 'getNames', async () => [['dave', 'emily', 'frank'], []]);
    test.mock.method(Math, 'random', () => 0);
    assert.strictEqual(application.getRandomPerson(), 'dave');
    test.mock.method(Math, 'random', () => 0.4);
    assert.strictEqual(application.getRandomPerson(), 'emily');
    test.mock.method(Math, 'random', () => 0.7);
    assert.strictEqual(application.getRandomPerson(), 'frank');
});

test('Application_selectNextPerson() selects next person correctly', async () => {
    const application = new Application();
    test.mock.method(application, 'getNames', async () => [['dave', 'emily', 'frank'], []]);
    application.selected = ['dave'];
    let cnt = 0;
    test.mock.method(application, 'getRandomPerson', () => {
        if (cnt <= 2) { 
            return ['emily', 'frank'][cnt++]; 
        }
    });
    assert.strictEqual(application.selectNextPerson(), 'emily');
    assert.deepStrictEqual(application.selected, ['dave', 'emily']);
    assert.strictEqual(application.selectNextPerson(), 'frank');
    assert.deepStrictEqual(application.selected, ['dave', 'emily', 'frank']);
    assert.strictEqual(application.selectNextPerson(), null);
});

test('Application_notifySelected() sends and writes emails for all selected people', async () => {
    const application = new Application();
    application.people = ['dave', 'emily', 'frank'];
    application.selected = ['dave', 'emily', 'frank'];
    application.mailSystem.send = test.mock.fn(application.mailSystem.send);
    application.mailSystem.write = test.mock.fn(application.mailSystem.write);
    application.notifySelected();
    assert.strictEqual(application.mailSystem.send.mock.calls.length, 3);
    assert.strictEqual(application.mailSystem.write.mock.calls.length, 3);
});
