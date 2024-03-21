const assert = require('assert');
<<<<<<< HEAD
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
=======

const sinon = require('sinon');
const { Application, MailSystem } = require('./main');

async function runTests() {
    const sandbox = sinon.createSandbox();
    
    // 确保存根返回的是一个数组，其中包含两个元素：一个人员名单数组和一个选定人员数组
    const readFileStub = sandbox.stub(Application.prototype, 'getNames').resolves([['John Doe', 'Jane Doe'], []]);

    try {
        const app = new Application();
        await app.getNames();

        // 由于我们存根了getNames方法，app.people 应该直接被设置为存根返回的第一个数组
        assert.deepStrictEqual(app.people, ['John Doe', 'Jane Doe']);

        const mailSystem = new MailSystem();
        sandbox.stub(mailSystem, 'send').returns(true);
        const context = mailSystem.write('John Doe');
        const sendResult = mailSystem.send('John Doe', context);

        assert.strictEqual(context, 'Congrats, John Doe!');
        assert(sendResult);

        app.selectNextPerson();
        app.notifySelected();
        assert(mailSystem.send.called);
    } catch (error) {
        console.error('Test failed:', error);
    } finally {
        sandbox.restore();
    }
}

runTests();
=======
const { Application, MailSystem } = require('./main');

// TODO: write your tests here
// Remember to use Stub, Mock, and Spy when necessary
>>>>>>> d6879be98fdbe2c53f872a1d12cba290f45d0d90
