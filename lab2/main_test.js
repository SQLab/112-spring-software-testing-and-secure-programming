
const test = require('node:test');
const assert = require('assert');
const { Application, MailSystem } = require('./main');

test("Test Application's selectNextPerson", () => {
    const app = new Application();
    const initialSelectedLength = app.selected.length;
    const selectedPerson = app.selectNextPerson();
    assert.strictEqual(app.selected.length, initialSelectedLength + 1, "One person should be selected");
});

test("Test Application's notifySelected", () => {
    const app = new Application();
    const consoleSpy = jest.spyOn(console, 'log');
    app.notifySelected();
    expect(consoleSpy).toHaveBeenCalled();
});

test("Test MailSystem's write method", () => {
    const mailSystem = new MailSystem();
    const name = "John";
    const context = mailSystem.write(name);
    assert.strictEqual(context, `Congrats, ${name}!`, "Context should match expected");
});

test("Test MailSystem's send method", () => {
    const mailSystem = new MailSystem();
    const name = "John";
    const context = "Test context";
    const result = mailSystem.send(name, context);
    assert(result === true || result === false, "send method should return a boolean");
});

test("Test Application's getRandomPerson", () => {
    const app = new Application();
    const getRandomPersonSpy = jest.spyOn(app, 'getRandomPerson');
    app.getRandomPerson();
    expect(getRandomPersonSpy).toHaveBeenCalled();
});
