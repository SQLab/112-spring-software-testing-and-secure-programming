const test = require('node:test');
const assert = require('assert');
const sinon = require('sinon');
const { Application, MailSystem } = require('./main');

test('notifySelected sends mail to all selected people', async () => {
    const mockMailSystem = sinon.createStubInstance(MailSystem);
    mockMailSystem.send.returns(true); // Assume sending mail is always successful

    // Stub the Application.getNames method before creating an instance
    sinon.stub(Application.prototype, 'getNames').resolves([['Alice', 'Bob', 'Charlie'], ['Alice']]);

    const app = new Application();
    app.mailSystem = mockMailSystem; // Use the mocked MailSystem

    // No need to call getNames as it should be invoked by the constructor

    app.selectNextPerson(); // Select the next person (could be anyone from the list except 'Alice')
    await app.notifySelected(); // Assuming notifySelected should be async and wait for all sends

    // Verify that the send method was called the correct number of times
    assert.strictEqual(mockMailSystem.send.callCount, app.selected.length);
    // Ensure the send method was called with the correct parameters
    app.selected.forEach((person) => {
        assert(mockMailSystem.send.calledWith(person, `Congrats, ${person}!`));
    });
});

