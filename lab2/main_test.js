const test = require('node:test');
const assert = require('assert');
const fs = require('fs');

// 模擬讀取名單的函式，返回假數據 'alice\nbob\ncarol'
test.mock.method(fs, 'readFile', (file, options, callback) => {
    callback(null, 'alice\nbob\ncarol');
});

const { Application, MailSystem } = require('./main');

// 測試 MailSystem 的 write 方法
test('MailSystem_write() with different names', () => {
    const ms = new MailSystem();
    assert.strictEqual(ms.write('alice'), 'Congratulations, alice!');
    assert.strictEqual(ms.write('bob'), 'Congratulations, bob!');
    assert.strictEqual(ms.write('carol'), 'Congratulations, carol!');
    assert.strictEqual(ms.write(null), 'Congratulations, null!');
});

// 測試 MailSystem 的 send 方法
test('MailSystem_send() with varying success rates', () => {
    const ms = new MailSystem();
    const name = 'alice';
    test.mock.method(Math, 'random', () => 0.8); // 模擬成功
    assert.strictEqual(ms.send(name, 'success'), true);
    test.mock.method(Math, 'random', () => 0.3); // 模擬失敗
    assert.strictEqual(ms.send(name, 'failure'), false);
});

// 測試 Application 的 getNames 方法
test('Application_getNames() returns correct names and selected list', async () => {
    const app = new Application();
    const expectedNames = ['alice', 'bob', 'carol'];
    const [names, selected] = await app.getNames();
    assert.deepStrictEqual(names, expectedNames);
    assert.deepStrictEqual(selected, []);
});

// 測試 Application 的 getRandomPerson 方法
test('Application_getRandomPerson() returns correct random person', async () => {
    const app = new Application();
    test.mock.method(app, 'getNames', async () => [['alice', 'bob', 'carol'], []]);
    test.mock.method(Math, 'random', () => 0); // 固定隨機值為0，返回第一個人名
    assert.strictEqual(app.getRandomPerson(), 'alice');
    test.mock.method(Math, 'random', () => 0.4); // 固定隨機值為0.4，返回第二個人名
    assert.strictEqual(app.getRandomPerson(), 'bob');
    test.mock.method(Math, 'random', () => 0.7); // 固定隨機值為0.7，返回第三個人名
    assert.strictEqual(app.getRandomPerson(), 'carol');
});

// 測試 Application 的 selectNextPerson 方法
test('Application_selectNextPerson() selects next person correctly', async () => {
    const app = new Application();
    test.mock.method(app, 'getNames', async () => [['alice', 'bob', 'carol'], []]);
    app.selected = ['alice'];
    let cnt = 0;
    test.mock.method(app, 'getRandomPerson', () => {
        if (cnt <= 2) { 
            return ['bob', 'carol'][cnt++]; 
        }
    });
    assert.strictEqual(app.selectNextPerson(), 'bob');
    assert.deepStrictEqual(app.selected, ['alice', 'bob']);
    assert.strictEqual(app.selectNextPerson(), 'carol');
    assert.deepStrictEqual(app.selected, ['alice', 'bob', 'carol']);
    assert.strictEqual(app.selectNextPerson(), null);
});

// 測試 Application 的 notifySelected 方法
test('Application_notifySelected() sends and writes emails for all selected people', async () => {
    const app = new Application();
    app.people = ['alice', 'bob', 'carol'];
    app.selected = ['alice', 'bob', 'carol'];
    app.mailSystem.send = test.mock.fn(app.mailSystem.send);
    app.mailSystem.write = test.mock.fn(app.mailSystem.write);
    app.notifySelected();
    assert.strictEqual(app.mailSystem.send.mock.calls.length, 3);
    assert.strictEqual(app.mailSystem.write.mock.calls.length, 3);
});
