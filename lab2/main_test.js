const test = require('node:test');
const assert = require('assert');
const sinon = require('sinon');
const { Application, MailSystem } = require('./main');

test('Application should notify selected person via MailSystem', async () => {
    const mockMailSystem = sinon.createStubInstance(MailSystem);
    mockMailSystem.write.returns('Congrats, Alice!');
    mockMailSystem.send.returns(true);

    // Directly stub the Application's prototype to affect all instances
    sinon.stub(Application.prototype, 'getNames').resolves(['Alice', 'Bob', 'Charlie']);

    const app = new Application();
    app.mailSystem = mockMailSystem;
    app.people = ['Alice', 'Bob', 'Charlie'];
    app.selected = ['Alice'];

    await app.notifySelected();

    assert(mockMailSystem.send.calledWith('Alice', 'Congrats, Alice!'));
});

