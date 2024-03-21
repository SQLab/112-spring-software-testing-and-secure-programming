const test = require('node:test');
const assert = require('assert');
const mockfs = require('node-mock-fs');
const { Application, MailSystem } = require('./main');

test('MailSystem', async (t) => {
    const mailSystem = new MailSystem();

    t.test('write', (t) => {
        const name = 'John';
        const context = mailSystem.write(name);
        assert.strictEqual(context, 'Congrats, John!');
        t.end();
    });

    t.test('send', (t) => {
        const name = 'Jane';
        const context = 'Hello, Jane!';
        const consoleSpy = t.mock('console');

        consoleSpy.once('log', (message) => {
            assert.strictEqual(message, '--send mail to Jane--');
        });

        consoleSpy.once('log', (message) => {
            assert(message === 'mail sent' || message === 'mail failed');
        });

        mailSystem.send(name, context);
        consoleSpy.restore();
        t.end();
    });
});

test('Application', async (t) => {
    mockfs({
        'name_list.txt': 'Alice\nBob\nCharlie\nDave\nEve',
    });

    const app = new Application();
    await app.getNames();

    t.test('getRandomPerson', (t) => {
        const randomPerson = app.getRandomPerson();
        assert(app.people.includes(randomPerson));
        t.end();
    });

    t.test('selectNextPerson', (t) => {
        const selectedPerson = app.selectNextPerson();
        assert(app.selected.includes(selectedPerson));
        t.end();
    });

    t.test('notifySelected', (t) => {
        const consoleSpy = t.mock('console');

        consoleSpy.callCount(Math.log, (callCount) => {
            assert.strictEqual(callCount, 0);
        });

        app.notifySelected();

        consoleSpy.callCount(Math.log, (callCount) => {
            assert.strictEqual(callCount, app.selected.length * 3 + 1);
        });

        consoleSpy.restore();
        t.end();
    });

    mockfs.restore();
});
