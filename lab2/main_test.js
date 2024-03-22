const test = require('node:test');
const assert = require('assert');
const sinon = require('sinon');
const { Application, MailSystem } = require('./main');

test('Application should notify selected person via MailSystem', async () => {
    const mockMailSystem = sinon.createStubInstance(MailSystem);
    mockMailSystem.write.returns('Congrats, Alice!');
    mockMailSystem.send.returns(true);

    sinon.stub(Application.prototype, 'getNames').resolves(['Alice', 'Bob', 'Charlie']);

    const app = new Application();
    app.mailSystem = mockMailSystem;
    app.people = ['Alice', 'Bob', 'Charlie'];
    app.selected = ['Alice'];

    await app.notifySelected();

    assert(mockMailSystem.write.calledWith('Alice'));
    assert(mockMailSystem.send.calledWith('Alice', 'Congrats, Alice!'));

    // Restore stub to avoid "Attempted to wrap getNames which is already wrapped" error
    Application.prototype.getNames.restore();
});

test('Application should handle selection and random person selection', async () => {
    const app = new Application();
    app.people = ['Alice', 'Bob', 'Charlie']; // Overriding for controlled testing
    sinon.stub(app, 'getRandomPerson').callsFake(() => 'Alice');

    const firstSelection = app.selectNextPerson();
    assert.strictEqual(firstSelection, 'Alice');
    assert(app.selected.includes(firstSelection));

    app.getRandomPerson.restore(); // Restore the stubbed method

    const secondSelection = app.selectNextPerson();
    assert.strictEqual(secondSelection, 'Bob'); // Assuming 'Bob' is the next random selection
    assert(app.selected.includes(secondSelection));

    app.selectNextPerson(); // All should now be selected
    assert.strictEqual(app.selectNextPerson(), null); // No more to select, should return null
});

test('MailSystem should write and send mail correctly', () => {
    const mailSystem = new MailSystem();
    const context = mailSystem.write('Bob');
    assert.strictEqual(context, 'Congrats, Bob!');

    const spySend = sinon.spy(mailSystem, 'send');
    mailSystem.send('Bob', context);
    assert(spySend.calledOnce);
    assert(spySend.calledWith('Bob', 'Congrats, Bob!'));

    mailSystem.send.restore(); // Restore the spy
});

