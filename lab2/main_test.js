const test = require('node:test');
const assert = require('assert');
const { Application, MailSystem } = require('./main');
const sinon = require('sinon');

test('notifySelected sends mail to all selected people', async () => {
    const mockMailSystem = sinon.createStubInstance(MailSystem);
    mockMailSystem.send.returns(true); // Assuming sending mail is always successful

    const app = new Application();
    app.mailSystem = mockMailSystem; // Use the mocked MailSystem

    // Stub the getNames method to return specific names and selections
    sinon.stub(app, 'getNames').resolves([['Alice', 'Bob', 'Charlie'], ['Alice']]);

    await app.getNames();
    app.selectNextPerson(); // Select the next person (assume it's Bob)
    app.notifySelected();

    // Verify that the send method was called the correct number of times (should be the number of selected people)
    assert.strictEqual(mockMailSystem.send.callCount, app.selected.length);
    // Ensure the send method was called with the correct parameters
    app.selected.forEach((person) => {
        assert(mockMailSystem.send.calledWith(person, `Congrats, ${person}!`));
    });
});

