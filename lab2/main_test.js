const assert = require('assert');
const sinon = require('sinon');
const { Application, MailSystem } = require('./main');

<<<<<<< HEAD
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
test('MailSystem should handle sending mail correctly', async (t) => {
    const mailSystem = new MailSystem();
    const mailSystemMock = sinon.mock(mailSystem);

    await t.step('sends mail successfully', () => {
        // Expectation: send will be called once with specific arguments and will return true
        mailSystemMock.expects('send').once().withArgs('Alice', 'Congrats, Alice!').returns(true);

        const content = mailSystem.write('Alice');
        assert.strictEqual(content, 'Congrats, Alice!');

        const sendResult = mailSystem.send('Alice', content);
        assert.strictEqual(sendResult, true);

        // Verify that all expectations on the mock were met
        mailSystemMock.verify();
    });

    await t.step('fails to send mail', () => {
        // Resetting expectations for the next scenario
        mailSystemMock.restore(); // Restore original method before setting new expectations
        mailSystemMock.expects('send').once().withArgs('Bob', 'Congrats, Bob!').returns(false);

        const content = mailSystem.write('Bob');
        assert.strictEqual(content, 'Congrats, Bob!');

        const sendResult = mailSystem.send('Bob', content);
        assert.strictEqual(sendResult, false);

        // Verify that all expectations on the mock were met
        mailSystemMock.verify();
    });
});

>>>>>>> 6915f90fb5d7c9303723bbc70e526d0e551afcea

