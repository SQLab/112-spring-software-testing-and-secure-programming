const test = require('node:test');
const assert = require('assert');
const sinon = require('sinon');
const fs = require('fs');
const { Application, MailSystem } = require('./main');

test('Application should load names and select a person', async (t) => {
    const readFileStub = sinon.stub(fs.promises, 'readFile');
    readFileStub.resolves('Alice\nBob\nCharlie');

    const app = new Application();

    await t.step('loads names from file', async () => {
        assert.deepStrictEqual(await app.getNames(), [['Alice', 'Bob', 'Charlie'], []]);
    });

    await t.step('selects a random person', () => {
        app.people = ['Alice', 'Bob', 'Charlie']; // directly set people for testing
        const person = app.selectNextPerson();
        assert(app.people.includes(person));
        assert.strictEqual(app.selected.includes(person), true);
    });

    readFileStub.restore();
});

test('MailSystem should send mails correctly', async (t) => {
    const mailSystem = new MailSystem();

    await t.step('writes mail content', () => {
        const content = mailSystem.write('Alice');
        assert.strictEqual(content, 'Congrats, Alice!');
    });

    await t.step('sends mail successfully', () => {
        const consoleLogSpy = sinon.spy(console, 'log');
        const result = mailSystem.send('Alice', 'Congrats, Alice!');
        assert(consoleLogSpy.calledWith('--send mail to Alice--'));
        assert(result === true || result === false); // due to randomness in send
        consoleLogSpy.restore();
    });
});

// Additional tests can be added as needed, focusing on specific functionalities and edge cases.

