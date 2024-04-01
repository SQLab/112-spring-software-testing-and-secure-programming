const TestLab = require('node:test');
const assert = require('assert');

// TODO: write your tests here
// Remember to use Stub, Mock, and Spy when necessary


// 模擬 fs.readFile 方法
TestLab.mock.method(require('fs'), 'readFile', (file, options, callback) => {
        callback(null, 'WHAT\nTHE\nFUCK!?');
});

// 從 main.js 導入 Application 和 MailSystem 類
const { Application, MailSystem } = require('./main');

// 測試 MailSystem_write() 方法
TestLab('MailSystem_write()', () => {
    const MailSYS = new MailSystem();
    assert.strictEqual(MailSYS.write('WHAT'), 'Congrats, WHAT!');
    assert.strictEqual(MailSYS.write(null), 'Congrats, null!');
    assert.strictEqual(MailSYS.write(52699625), 'Congrats, 52699625!');
});

// 測試 MailSystem_send() 方法
TestLab('MailSystem_send()', () => {
    const MailSYS = new MailSystem();
    TestLab.mock.method(Math, 'random', () => 0.7);
    assert.strictEqual(MailSYS.send('WHAT', 'It work!!'), true);
    TestLab.mock.method(Math, 'random', () => 0.3);
    assert.strictEqual(MailSYS.send('WHAT', 'It cant work'), false);
});

// 測試 Application_getNames() 方法
TestLab('Application_getNames()', async () => {
    const app = new Application();
    const [test_lists] = await app.getNames();
    assert.deepStrictEqual(test_lists, ['WHAT', 'THE', 'FUCK!?']);
});

// 測試 Application_getRandomPerson() 方法
TestLab('Application_getRandomPerson()', async () => {
    const app = new Application();
    const [test_lists] = await app.getNames();
    const randomPerson = app.getRandomPerson();
    assert.ok(test_lists.includes(randomPerson));
});

// 測試 Application_selectNextPerson() 方法
TestLab('Application_selectNextPerson()', async () => {
    const app = new Application();
    const [test_lists] = await app.getNames();
    app.selected = ['WHAT'];
    let count = 0;
    TestLab.mock.method(app, 'getRandomPerson', () => {
        if (count <= test_lists.length) { 
            return test_lists[count++]; 
        }
    });
    assert.strictEqual(app.selectNextPerson(), 'THE');
    assert.deepStrictEqual(app.selected, ['WHAT', 'THE']);
    assert.strictEqual(app.selectNextPerson(), 'FUCK!?');
    assert.deepStrictEqual(app.selected, ['WHAT', 'THE', 'FUCK!?']);
    assert.strictEqual(app.selectNextPerson(), null);
});

// 測試 Application_notifySelected() 方法
TestLab('Application_notifySelected()', async () => {
    const app = new Application();
    const [people] = await app.getNames();
    app.selected = [...people];
    app.mailSystem.send = TestLab.mock.fn(app.mailSystem.send);
    app.mailSystem.write = TestLab.mock.fn(app.mailSystem.write);
    app.notifySelected();
assert.strictEqual(app.mailSystem.send.mock.calls.length, people.length);
    assert.strictEqual(app.mailSystem.write.mock.calls.length, people.length);
});
