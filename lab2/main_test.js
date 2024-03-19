const test = require('node:test');
const assert = require('assert');
const fs = require('fs');
const path = require('path');

const { Application, MailSystem } = require('./main');

test('should return a message context', () => {
    const mailSystem = new MailSystem();
    const userName = 'Evan';

    const context = mailSystem.write(userName);
    assert.strictEqual(context, 'Congrats, Evan!');
});

test('should return true if mail is sent successfully', (t) => {
    const mailSystem = new MailSystem();
    const userName = 'Evan';

    // test send mail success return true
    t.mock.method(Math, 'random', () => 1);
    let isSent = mailSystem.send('Liam', "test mail");
    assert.strictEqual(isSent, true);

    // test send mail fail return false
    t.mock.method(Math, 'random', () => 0.4);
    isSent = mailSystem.send('Liam', "test mail");
    assert.strictEqual(isSent, false);
});

test('should return name_list', async () => {
    // Write mock name list to a temporary file
    const nameListContent = 'Emma\nNoah\nOlivia';
    const tempFilePath = path.join(os.tmpdir(), 'name_list.txt');
    fs.writeFileSync(tempFilePath, nameListContent);

    // Attach cleanup handler to the process exit event
    process.on('exit', () => {
        if (tempFilePath) {
            fs.unlinkSync(tempFilePath);
        }
    });

    // Instantiate Application class and call getNames with the temporary file path
    const app = new Application();
    const [people, selected] = await app.getNames(tempFilePath);

    // Assert the results
    assert.deepStrictEqual(people, ['Emma', 'Noah', 'Olivia']);
    assert.deepStrictEqual(selected, []);
});

test('should return null if all people are selected', async (t) => {
    const app = new Application();
    app.people = ['Emma', 'Noah', 'Olivia'];
    app.selected = ['Emma', 'Noah', 'Olivia'];

    const result = app.selectNextPerson();
    assert.strictEqual(result, null);
});

test('should return a random person', () => {
    // Stub Math.random() to return a fixed value
    Math.random = () => 0.5;
    const app = new Application();
    app.people = ['Emma', 'Noah', 'Olivia'];
    const randomPerson = app.getRandomPerson();

    assert(app.people.includes(randomPerson));
});

test('should select and return a person who has not been selected yet', () => {
    const app = new Application();
    app.people = ['Emma', 'Noah', 'Olivia'];

    let getRandomPersonCallCount = 0;
    app.getRandomPerson = () => {
        switch (getRandomPersonCallCount++) {
            case 0:
                return 'Emma';
            case 1:
                return 'Noah';
            case 2:
                return 'Olivia';
        }
    };

    app.selected = ['Emma', 'Noah'];
    const result = app.selectNextPerson();

    assert.strictEqual(result, 'Olivia');
    assert.strictEqual(getRandomPersonCallCount, 3);
});

class MockMailSystem {
    constructor() {
        this.writeCallCount = 0;
        this.sendCallCount = 0;
    }

    write() {
        this.writeCallCount++;
        return 'Message context';
    }

    send() {
        this.sendCallCount++;
        return true;
    }
}

test('should call write and send methods of MailSystem for each selected person', () => {
    const mailSystem = new MockMailSystem();
    const app = new Application();
    app.mailSystem = mailSystem;
    app.selected = ['Emma', 'Noah', 'Olivia'];

    app.notifySelected();

    assert.strictEqual(mailSystem.writeCallCount, 3);
    assert.strictEqual(mailSystem.sendCallCount, 3);
});
