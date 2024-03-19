const test = require('node:test');
const assert = require('assert');
const sinon = require('sinon');
const { Application, MailSystem } = require('./main');

test('notifySelected sends mail to all selected people', async () => {
    const mockMailSystem = sinon.createStubInstance(MailSystem);
    mockMailSystem.send.returns(true); // Assume sending mail is always successful

    // Stub the getNames method of the Application class
    const getNamesStub = sinon.stub(Application.prototype, 'getNames');
    getNamesStub.resolves([['Alice', 'Bob', 'Charlie'], []]);

    const app = new Application();
    await getNamesStub.lastCall.returnValue;  // Ensure the stubbed getNames method has resolved

    app.mailSystem = mockMailSystem; // Replace the real MailSystem with the mocked one

    // Select next person for testing
    app.selectNextPerson();
    await app.notifySelected(); // Wait for notifySelected to complete

    // Verify that the send method was called the correct number of times
    assert.strictEqual(mockMailSystem.send.callCount, app.selected.length);
    // Ensure the send method was called with the correct parameters
    app.selected.forEach((person) => {
        assert(mockMailSystem.send.calledWith(person, `Congrats, ${person}!`));
    });

    // Restore the stubbed method to its original behavior
    getNamesStub.restore();
});

