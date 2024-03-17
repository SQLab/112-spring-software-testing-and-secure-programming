const test = require('node:test');
const assert = require('assert');
const { Application, MailSystem } = require('./main');

// TODO: write your tests here
// Remember to use Stub, Mock, and Spy when necessary

// Stub: 模擬郵件發送
class MockMailSystem extends MailSystem {
    constructor() {
        super();
        this.sentMails = [];
    }

    send(name, context) {
        console.log('--mock send mail to ' + name + '--');
        this.sentMails.push({ name, context });
        return true;  
    }

    getSentMails() {
        return this.sentMails;
    }
}

test('Application selects and notifies one person', () => {
    const app = new Application();
    const mockMailSystem = new MockMailSystem();
    app.mailSystem = mockMailSystem;

    // 模擬 getRandomPerson 返回特定人
    app.getRandomPerson = () => 'John Doe';

    const selectedPerson = app.selectNextPerson();
    assert.strictEqual(selectedPerson, 'John Doe', 'Selected person should be John Doe');

    app.notifySelected();

    const sentMails = mockMailSystem.getSentMails();
    assert.strictEqual(sentMails.length, 1, 'One mail should have been sent');
    assert.strictEqual(sentMails[0].name, 'John Doe', 'Sent mail should be to John Doe');
    assert.strictEqual(sentMails[0].context, 'Congrats, John Doe!', 'Mail content should be correct');
});

test('Application selects and notifies multiple people', () => {
    const app = new Application();
    const mockMailSystem = new MockMailSystem();
    app.mailSystem = mockMailSystem;
    // 模擬 getRandomPerson 返回不同人
    let count = 0;
    app.getRandomPerson = () => {
        const people = ['Alice', 'Bob', 'Charlie'];
        return people[count++ % people.length];
    };

    // Select and notify multiple people
    for (let i = 0; i < 3; i++) {
        const selectedPerson = app.selectNextPerson();
        assert.ok(['Alice', 'Bob', 'Charlie'].includes(selectedPerson), 'Selected person should be one of Alice, Bob, Charlie');
    }

    app.notifySelected();

    const sentMails = mockMailSystem.getSentMails();
    assert.strictEqual(sentMails.length, 3, 'Three mails should have been sent');

    const expectedContexts = ['Congrats, Alice!', 'Congrats, Bob!', 'Congrats, Charlie!'];
    sentMails.forEach((mail, index) => {
        assert.strictEqual(mail.context, expectedContexts[index], 'Mail content should be correct');
    });
});

test('MailSystem should log "mail sent" on successful send', () => {
    const mailSystem = new MailSystem();

    // 返回 < 0.5 (success)
    const stub = test.stub(Math, 'random').returns(0.4);

    const consoleSpy = test.spy(console, 'log');

    mailSystem.send('John Doe', 'Test Mail');

    stub.restore();
    consoleSpy.restore();

    assert.ok(consoleSpy.calledWith('mail sent'), 'Console should log "mail sent"');
});

test('MailSystem should log "mail failed" on failed send', () => {
    const mailSystem = new MailSystem();

    // 返回 >= 0.5 (failure)
    const stub = test.stub(Math, 'random').returns(0.6);

    const consoleSpy = test.spy(console, 'log');

    mailSystem.send('John Doe', 'Test Mail');

    stub.restore();
    consoleSpy.restore();

    assert.ok(consoleSpy.calledWith('mail failed'), 'Console should log "mail failed"');
});
