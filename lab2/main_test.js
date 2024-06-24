const test = require('node:test');
const assert = require('assert');
const fs = require('fs');
const { Application, MailSystem } = require('./main');
const sinon = require('sinon');

// Mock fs.readFile
sinon.stub(fs, 'readFile').callsFake((file, options, callback) => {
    callback(null, 'Guan\nChen\nGala\n');
});

test("MailSystem write", () => {
    const mailSystem = new MailSystem();
    assert.strictEqual(mailSystem.write("Guan"), "Congrats, Guan!");
});

test("MailSystem send", () => {
    const mailSystem = new MailSystem();
    const originalMathRandom = Math.random;

    Math.random = () => 0.6;
    const context = mailSystem.write("Guan");
    assert.strictEqual(mailSystem.send("Guan", context), true);

    Math.random = () => 0.4;
    assert.strictEqual(mailSystem.send("Chen", context), false);

    Math.random = originalMathRandom;
});

test("Application getNames", async () => {
    const application = new Application();
    const [people, selected] = await application.getNames();
    // Remove any empty strings from the array
    assert.deepStrictEqual(people.filter(name => name), ["Guan", "Chen", "Gala"]);
    assert.deepStrictEqual(selected, []);
});

test("Application getRandomPerson", () => {
    const application = new Application();
    application.people = ["Guan", "Chen", "Gala"];
    Math.random = () => 0;
    assert.deepStrictEqual(application.getRandomPerson(), "Guan");
    Math.random = () => 0.6;
    assert.deepStrictEqual(application.getRandomPerson(), "Chen");
    Math.random = () => 0.9;
    assert.deepStrictEqual(application.getRandomPerson(), "Gala");
});

test("Application selectNextPerson", async () => {
    const application = new Application();
    await application.getNames();
    application.selected = ["Guan"];
    let count = 1;
    const getRandomPersonStub = sinon.stub(application, 'getRandomPerson').callsFake(() => {
        const name_list = application.people;
        if (count < name_list.length) {
            return name_list[count++];
        } else {
            return null;
        }
    });

    assert.strictEqual(application.selectNextPerson(), "Chen");
    assert.strictEqual(application.selectNextPerson(), "Gala");
    assert.strictEqual(application.selectNextPerson(), null);

    getRandomPersonStub.restore();
});

test("Application notifySelected", () => {
    const application = new Application();
    application.people = ["Guan", "Chen", "Gala"];
    application.selected = ["Guan", "Chen", "Gala"];
    sinon.spy(application.mailSystem, 'write');
    sinon.spy(application.mailSystem, 'send');
    application.notifySelected();
    assert.strictEqual(application.mailSystem.write.callCount, application.people.length);
    assert.strictEqual(application.mailSystem.send.callCount, application.people.length);
});
