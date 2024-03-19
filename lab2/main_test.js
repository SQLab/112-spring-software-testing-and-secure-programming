const test = require('node:test');
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { Application, MailSystem } = require('./main');

function testMailSystemBehavior(name, expectedResult) {
    const mailSystem = new MailSystem();
    const context = mailSystem.write(name);
    assert.strictEqual(context, expectedResult);
}

test('MailSystem behavior tests', () => {
    testMailSystemBehavior('John', 'Congrats, John!');
});

test('Application method tests', async () => {
    const app = new Application();
    const tempFilePath = path.join(os.tmpdir(), 'name_list.txt');
    fs.writeFileSync(tempFilePath, 'Alice\nBob\nCharlie');

    const [people, selected] = await app.getNames(tempFilePath);
    assert.deepStrictEqual(people, ['Alice', 'Bob', 'Charlie']);
    assert.deepStrictEqual(selected, []);

    fs.unlinkSync(tempFilePath);

});


test('should call write and send methods of MailSystem for each selected person', () => {
    const mailSystem = new MockMailSystem();
    const app = new Application(mailSystem, ['Alice', 'Bob', 'Charlie']);
    app.notifySelected();
    assert.strictEqual(mailSystem.writeCallCount, 3);
    assert.strictEqual(mailSystem.sendCallCount, 3);
});

