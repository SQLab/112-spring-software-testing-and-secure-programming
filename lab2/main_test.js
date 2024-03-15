const test = require('node:test');
const assert = require('assert');
const sinon = require('sinon');
const mock_fs = require('mock-fs');
const { Application, MailSystem } = require('./main');

test.beforeEach(() => {
    const mockNameList = 'Alice\nBob\nCharlie';
    mock_fs({
        'name_list.txt': mockNameList
    });
});

test.afterEach(() => {
    mock_fs.restore();
});

test('should return a message context', () => {
    const mailSystem = new MailSystem();
    const name = 'John';
    const consoleStub = sinon.stub(console, 'log');
    const context = mailSystem.write(name);
    assert(consoleStub.calledWith('--write mail for John--'));
    assert.strictEqual(context, 'Congrats, John!');

    consoleStub.restore(); // Restore the stubbed console.log() function
});

test('should return true if mail is sent successfully', () => {
    const mailSystem = new MailSystem();
    const name = 'John';

    // Stub Math.random() to control the success of sending mail
    const mathRandomStub = sinon.stub(Math, 'random');
    mathRandomStub.onFirstCall().returns(1); // Success
    mathRandomStub.onSecondCall().returns(0.4); // Failure

    const is_send_success = mailSystem.send('Joy', "test mail");
    assert.strictEqual(is_send_success, true);

    const is_send_fail = mailSystem.send('Joy', "test mail");
    assert.strictEqual(is_send_fail, false);

    mathRandomStub.restore(); // Restore the stubbed Math.random() function
});

test('getNames()', async () => {
    const app = new Application();
    const [people, selected] = await app.getNames(); // Ensure that names are populated

    assert.deepStrictEqual(people, ['Alice', 'Bob', 'Charlie']);
    assert.deepStrictEqual(selected, []);
});

test('Application - should return null if all people are selected', () => {
    const app = new Application();
    app.people = ['Alice', 'Bob', 'Charlie'];
    app.selected = ['Alice', 'Bob', 'Charlie'];

    const result = app.selectNextPerson();

    assert.strictEqual(result, null);
});

test('Application - should select and return a person who has not been selected yet', () => {
    const app = new Application();
    app.people = ['Alice', 'Bob', 'Charlie'];
    app.selected = ['Alice', 'Bob'];

    const next_result = app.selectNextPerson();

    assert.ok(app.people.includes(next_result));
    assert.ok(app.selected.includes(next_result));
});

test('Application - should call write and send methods of MailSystem for each selected person', () => {
    const mailSystem = new MailSystem();
    const writeStub = sinon.stub(mailSystem, 'write').returns('Message context');
    const sendStub = sinon.stub(mailSystem, 'send').returns(true);

    const app = new Application();
    app.mailSystem = mailSystem;
    app.selected = ['Alice', 'Bob', 'Charlie'];

    app.notifySelected();

    assert.strictEqual(writeStub.callCount, 3);
    assert.strictEqual(sendStub.callCount, 3);

    writeStub.restore(); // Restore the stubbed write() method
    sendStub.restore(); // Restore the stubbed send() method
});
