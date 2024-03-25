const test = require('node:test');
const assert = require('assert');
const fs = require('fs');

// TODO: write your tests here
// Remember to use Stub, Mock, and Spy when necessary

// 模擬讀取名單的函式，返回假數據 'john\nmary'
test.mock.method(fs, 'readFile', (file, options, callback) => {
    callback(null, 'boa\nsasuke');
});

const { Application, MailSystem } = require('./main');

// 測試 MailSystem 的 write 方法
test('MailSystem_write() with different names', () => {
    const ms = new MailSystem();
    assert.strictEqual(ms.write('john'), 'Congratulations, boa!');
    assert.strictEqual(ms.write('mary'), 'Congratulations, sasuke!');
    assert.strictEqual(ms.write(null), 'Congratulations, null!');
});

// 測試 MailSystem 的 send 方法
test('MailSystem_send() with varying success rates', () => {
    const ms = new MailSystem();
    const name = 'boa';
    test.mock.method(Math, 'random', () => 0.4); 
    assert.strictEqual(ms.send(name, 'success'), true);
    test.mock.method(Math, 'random', () => 0.6); 
    assert.strictEqual(ms.send(name, 'fail'), false);
});

// 測試 Application 的 getNames 方法
test('Application_getNames() returns correct names and selected list', async () => {
    const app = new Application();
    const expectedNames = ['boa', 'sasuke'];
    const [names, selected] = await app.getNames();
    assert.deepStrictEqual(names, expectedNames);
    assert.deepStrictEqual(selected, []);
});

// 測試 Application 的 getRandomPerson 方法
test('Application_getRandomPerson() returns correct random person', async () => {
    const app = new Application();
    test.mock.method(app, 'getNames', async () => [['boa', 'sasuke'], []]);
    test.mock.method(Math, 'random', () => 0.3); // 固定隨機值為0.3，返回第一個人名
    assert.strictEqual(app.getRandomPerson(), 'boa');
    test.mock.method(Math, 'random', () => 0.7); // 固定隨機值為0.7，返回第二個人名
    assert.strictEqual(app.getRandomPerson(), 'sasuke');
});

// 測試 Application 的 selectNextPerson 方法
test('Application_selectNextPerson() selects next person correctly', async () => {
    const app = new Application();
    test.mock.method(app, 'getNames', async () => [['boa', 'sasuke'], []]);
    app.selected = ['boa'];
    let cnt = 0;
    test.mock.method(app, 'getRandomPerson', () => {
        if (cnt <= 1) { 
            return ['boa', 'sasuke'][cnt++]; 
        }
    });
    assert.strictEqual(app.selectNextPerson(), 'sasuke');
    assert.deepStrictEqual(app.selected, ['boa', 'sasuke']);
    assert.strictEqual(app.selectNextPerson(), 'boa');
    assert.deepStrictEqual(app.selected, ['boa', 'sasuke', 'boa']);
    assert.strictEqual(app.selectNextPerson(), null);
});

// 測試 Application 的 notifySelected 方法
test('Application_notifySelected() sends and writes emails for all selected people', async () => {
    const app = new Application();
    app.people = ['boa', 'sasuke'];
    app.selected = ['boa', 'sasuke'];
    app.mailSystem.send = test.mock.fn(app.mailSystem.send);
    app.mailSystem.write = test.mock.fn(app.mailSystem.write);
    app.notifySelected();
    assert.strictEqual(app.mailSystem.send.mock.calls.length, 2);
    assert.strictEqual(app.mailSystem.write.mock.calls.length, 2);
});
