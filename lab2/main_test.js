const assert = require('assert');

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