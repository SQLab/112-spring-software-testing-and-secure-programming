const test = require('node:test');
const assert = require('assert');
const sinon = require('sinon');
const { Application, MailSystem } = require('./main');

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


