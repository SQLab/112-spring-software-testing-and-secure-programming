const test = require('node:test');
const assert = require('assert');
const fs = require('fs');

// TODO: write your tests here
// Remember to use Stub, Mock, and Spy when necessary

// 模擬讀取名單的函式，返回假數據 'john\nmary'
test.mock.method(fs, 'readFile', (file, options, callback) => {
    callback(null, 'john\nmary');
});

const { Application, MailSystem } = require('./main');

// 測試 MailSystem 的 write 方法
test('MailSystem_write() with different names', () => {
    const ms = new MailSystem();
    assert.strictEqual(ms.write('john'), 'Congratulations, john!');
    assert.strictEqual(ms.write('mary'), 'Congratulations, mary!');
    assert.strictEqual(ms.write(null), 'Congratulations, null!');
});

// 測試 MailSystem 的 send 方法
test('MailSystem_send() with varying success rates', () => {
    const ms = new MailSystem();
    const name = 'john';
    test.mock.method(Math, 'random', () => 0.25); // 隨機值在0到0.25之間
    assert.strictEqual(ms.send(name, 'success'), true);
    test.mock.method(Math, 'random', () => 0.75); // 隨機值在0.75到1之間
    assert.strictEqual(ms.send(name, 'failure'), false);
});

// 測試 Application 的 getNames 方法
test('Application_getNames() returns correct names and selected list', async () => {
    const app = new Application();
    const expectedNames = ['john', 'mary'];
    const [names, selected] = await app.getNames();
    assert.deepStrictEqual(names, expectedNames);
    assert.deepStrictEqual(selected, []);
});

// 測試 Application 的 getRandomPerson 方法
test('Application_getRandomPerson() returns correct random person', async () => {
    const app = new Application();
    test.mock.method(app, 'getNames', async () => [['john', 'mary'], []]);
    test.mock.method(Math, 'random', () => 0.3); // 固定隨機值為0.3，返回第一個人名
    assert.strictEqual(app.getRandomPerson(), 'john');
    test.mock.method(Math, 'random', () => 0.7); // 固定隨機值為0.7，返回第二個人名
    assert.strictEqual(app.getRandomPerson(), 'mary');
});

// 測試 Application 的 selectNextPerson 方法
test('Application_selectNextPerson() selects next person correctly', async () => {
    const app = new Application();
    test.mock.method(app, 'getNames', async () => [['john', 'mary'], []]);
    app.selected = ['john'];
    let cnt = 0;
    test.mock.method(app, 'getRandomPerson', () => {
        if (cnt <= 1) { 
            return ['mary', 'john'][cnt++]; 
        }
    });
    assert.strictEqual(app.selectNextPerson(), 'mary');
    assert.deepStrictEqual(app.selected, ['john', 'mary']);
    assert.strictEqual(app.selectNextPerson(), 'john');
    assert.deepStrictEqual(app.selected, ['john', 'mary', 'john']);
    assert.strictEqual(app.selectNextPerson(), null);
});

// 測試 Application 的 notifySelected 方法
test('Application_notifySelected() sends and writes emails for all selected people', async () => {
    const app = new Application();
    app.people = ['john', 'mary'];
    app.selected = ['john', 'mary'];
    app.mailSystem.send = test.mock.fn(app.mailSystem.send);
    app.mailSystem.write = test.mock.fn(app.mailSystem.write);
    app.notifySelected();
    assert.strictEqual(app.mailSystem.send.mock.calls.length, 2);
    assert.strictEqual(app.mailSystem.write.mock.calls.length, 2);
});
