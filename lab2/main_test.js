const test = require('node:test');
const assert = require('assert');
const fs = require('fs');

// 模擬讀取名單的函式，返回假數據 'steve\nellen'
test.mock.method(fs, 'readFile', (file, options, callback) => {
    callback(null, 'steve\nellen');
});

const { Application, MailSystem } = require('./main');

// 測試 MailSystem 的 write 方法
test('MailSystem_write() with different names', () => {
    const ms = new MailSystem();
    assert.strictEqual(ms.write('steve'), 'Congratulations, steve!');
    assert.strictEqual(ms.write('ellen'), 'Congratulations, ellen!');
    assert.strictEqual(ms.write(null), 'Congratulations, null!');
});

// 測試 MailSystem 的 send 方法
test('MailSystem_send() with varying success rates', () => {
    const ms = new MailSystem();
    const name = 'steve';
    test.mock.method(Math, 'random', () => 0.6);
    assert.strictEqual(ms.send(name, 'success'), true);
    test.mock.method(Math, 'random', () => 0.4);
    assert.strictEqual(ms.send(name, 'failure'), false);
});

// 測試 Application 的 getNames 方法
test('Application_getNames() returns correct names and selected list', async () => {
    const app = new Application();
    const expectedNames = ['steve', 'ellen'];
    const [names, selected] = await app.getNames();
    assert.deepStrictEqual(names, expectedNames);
    assert.deepStrictEqual(selected, []);
});

// 測試 Application 的 getRandomPerson 方法
test('Application_getRandomPerson() returns correct random person', async () => {
    const app = new Application();
    test.mock.method(app, 'getNames', async () => [['steve', 'ellen'], []]);
    test.mock.method(Math, 'random', () => 0.2); // 固定隨機值為0.2，返回第一個人名
    assert.strictEqual(app.getRandomPerson(), 'steve');
    test.mock.method(Math, 'random', () => 0.7); // 固定隨機值為0.7，返回第二個人名
    assert.strictEqual(app.getRandomPerson(), 'ellen');
});

// 測試 Application 的 selectNextPerson 方法
test('Application_selectNextPerson() selects next person correctly', async () => {
    const app = new Application();
    test.mock.method(app, 'getNames', async () => [['steve', 'ellen'], []]);
    app.selected = ['steve'];
    let cnt = 0;
    test.mock.method(app, 'getRandomPerson', () => {
        if (cnt <= 1) { 
            return ['ellen', 'steve'][cnt++]; 
        }
    });
    assert.strictEqual(app.selectNextPerson(), 'ellen');
    assert.deepStrictEqual(app.selected, ['steve', 'ellen']);
    assert.strictEqual(app.selectNextPerson(), 'steve');
    assert.deepStrictEqual(app.selected, ['steve', 'ellen', 'steve']);
    assert.strictEqual(app.selectNextPerson(), null);
});

// 測試 Application 的 notifySelected 方法
test('Application_notifySelected() sends and writes emails for all selected people', async () => {
    const app = new Application();
    app.people = ['steve', 'ellen'];
    app.selected = ['steve', 'ellen'];
    app.mailSystem.send = test.mock.fn(app.mailSystem.send);
    app.mailSystem.write = test.mock.fn(app.mailSystem.write);
    app.notifySelected();
    assert.strictEqual(app.mailSystem.send.mock.calls.length, 2);
    assert.strictEqual(app.mailSystem.write.mock.calls.length, 2);
});
