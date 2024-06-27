const test = require('node:test');
const assert = require('assert');
const fs = require('fs');


test('MailSystem - write() method writes mail content', () => {
    const mailSystem = new MailSystem();
    const name = 'Alice';
    const context = mailSystem.write(name);
    assert.strictEqual(context, 'Congrats, Alice!');
});

test('MailSystem - send() method sends mail to recipient successfully', () => {
    const mailSystem = new MailSystem();
    const name = 'Alice';
    test.mock.method(Math, 'random', () => 0.8); // Mock Math.random() to return 0.8
    assert.strictEqual(mailSystem.send(name, 'success'), true); // Confirm successful mail sending
});

test('MailSystem - send() method fails to send mail to recipient', () => {
    const mailSystem = new MailSystem();
    const name = 'Alice';
    test.mock.method(Math, 'random', () => 0.2); // Mock Math.random() to return 0.2
    assert.strictEqual(mailSystem.send(name, 'fail'), false); // Confirm failed mail sending
});


test('Application - getNames retrieves names from file', async () => {
    const application = new Application([], [], {});
    await application.getNames();
    assert.deepStrictEqual(application.people, ['Aqur', 'Bobi', 'cat']);
});


test('Application - getRandomPerson returns a person', async () => {
    const application = new Application([], [], {});
    await application.getNames();
    const person = application.getRandomPerson();
    assert(['Aqur', 'Bobi', 'cat'].includes(person));
});


test('Application - selectNextPerson selects a person', async () => {
    const app = new Application();
    const [names] = await app.getNames();
    app.selected = ['Aqur'];
    let count = 0;
    test.mock.method(app, 'getRandomPerson', () => names[count++]);
    assert.strictEqual(app.selectNextPerson(), 'Bobi');
    assert.deepStrictEqual(app.selected, ['Aqur', 'Bobi']);
    assert.strictEqual(app.selectNextPerson(), 'cat');
    assert.deepStrictEqual(app.selected, ['Aqur', 'Bobi', 'cat']);
    assert.strictEqual(app.selectNextPerson(), null);
});

test('Application - notifySelected notifies all selected people', async () => {
    const app = new Application();
    const [names] = await app.getNames();
    app.selected = names.slice(); // Select all names initially
    app.mailSystem.send = test.mock.fn(app.mailSystem.send);
    app.mailSystem.write = test.mock.fn(app.mailSystem.write);
    app.notifySelected();
    assert.strictEqual(app.mailSystem.send.mock.calls.length, names.length);
    assert.strictEqual(app.mailSystem.write.mock.calls.length, names.length);

});
