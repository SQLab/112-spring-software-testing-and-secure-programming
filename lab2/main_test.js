const test = require('node:test');
const assert = require('assert');
const fs = require('fs');

// 使用 Monk 模擬 fs.readFile 的行為
test.monk(fs, 'readFile', (file, options, callback) => {
    callback(null, 'Tiny\nDick');
});

const { Application, MailSystem } = require('./main');

// 測試 MailSystem_write 函式
test('Test MailSystem_write() ', () => {
    const mailSystem = new MailSystem();

    assert.strictEqual(mailSystem.write('Tiny'), 'Congrats, Tiny!', 'Write method should return the correct context');
    assert.strictEqual(mailSystem.write('Dick'), 'Congrats, Dick!');
});

// 測試 MailSystem_send 函式，使用 Spy 來檢查是否有正確調用 Math.random()
test('Test MailSystem_send() with Random Function', () => {
    const mailSystem = new MailSystem();
    const name = 'Tiny';
    const context = 'test';

    const randomSpy = test.spy(Math, 'random');

    mailSystem.send(name, context);
    assert.strictEqual(randomSpy.calls.length, 1, 'Math.random() should be called once');
});

// 使用 Stub 來模擬 getNames 函式的行為
const getNamesStub = test.stub(Application.prototype, 'getNames').resolves([['Tiny', 'Dick'], []]);

// 測試 getNames 函式
test('Test getNames()', async () => {
    const app = new Application();
    const [people, selected] = await app.getNames();
    assert.deepStrictEqual(people, ['Tiny', 'Dick'], 'People array should match expected value');
    assert.deepStrictEqual(selected, [], 'Selected array should be empty');
});

// 測試 Application_getRandomPerson 函式
test('Test Application_getRandomPerson()', () => {
    const app = new Application();
    const randomPerson = app.getRandomPerson();
    assert.ok(['Tiny', 'Dick'].includes(randomPerson), 'Random person should be one of the names');
});

// 測試 Application_selectNextPerson 函式
test('Test Application_selectNextPerson()', () => {
    const app = new Application();
    app.selected = ['Tiny'];
    const selectedPerson = app.selectNextPerson();
    assert.ok(['Tiny', 'Dick'].includes(selectedPerson), 'Selected person should be one of the names');
});

// 測試 Application_notifySelected 函式，使用 Spy 來檢查是否有正確調用 mailSystem.send 和 mailSystem.write
test('Test Application_notifySelected()', () => {
    const app = new Application();
    app.people = ['Tiny', 'Dick'];
    app.selected = ['Tiny', 'Dick'];
    
    const mailSystem = new MailSystem();
    const sendSpy = test.spy(mailSystem, 'send');
    const writeSpy = test.spy(mailSystem, 'write');

    app.notifySelected();
    
    assert.strictEqual(sendSpy.calls.length, 2, 'mailSystem.send should be called twice');
    assert.strictEqual(writeSpy.calls.length, 2, 'mailSystem.write should be called twice');
});
