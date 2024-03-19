const test = require('node:test');
const assert = require('assert');
const fs = require('fs');
const { Application, MailSystem } = require('./main');

// 模擬fs.readFile方法
function mockReadFile() {
    test.mock.method(fs, 'readFile', (file, options, callback) => {
        callback(null, 'alpha\nbeta\ngama');
    });
}

// 模擬Math.random方法
function mockRandom(returnValue) {
    test.mock.method(Math, 'random', () => returnValue);
}

// 測試MailSystem的write方法
function testMailSystemWrite() {
    const ms = new MailSystem();
    assert.strictEqual(ms.write('alpha'), 'Congrats, alpha!');
    assert.strictEqual(ms.write(null), 'Congrats, null!');
    assert.strictEqual(ms.write(48763), 'Congrats, 48763!');
}

// 測試MailSystem的send方法
function testMailSystemSend() {
    const ms = new MailSystem();
    const name = 'alpha';
    mockRandom(0.6); // 成功的情況
    assert.strictEqual(ms.send(name, 'success'), true);
    mockRandom(0.4); // 失敗的情況
    assert.strictEqual(ms.send(name, 'fail'), false);
}

// 測試Application的getNames方法
async function testApplicationGetNames() {
    mockReadFile();
    const app = new Application();
    const expectedNames = ['alpha', 'beta', 'gama'];
    const names = await app.getNames();
    assert.deepStrictEqual(names, [expectedNames, []]);
}

// 測試Application的getRandomPerson方法
async function testApplicationGetRandomPerson() {
    const app = new Application();
    await app.getNames();
    mockRandom(0); // 第一個人
    assert.strictEqual(app.getRandomPerson(), 'alpha');
    mockRandom(0.4); // 第二個人
    assert.strictEqual(app.getRandomPerson(), 'beta');
    mockRandom(0.7); // 第三個人
    assert.strictEqual(app.getRandomPerson(), 'gama');
}

// 測試Application的selectNextPerson方法
async function testApplicationSelectNextPerson() {
    const app = new Application();
    await app.getNames();
    app.selected = ['alpha'];
    let cnt = 0;
    test.mock.method(app, 'getRandomPerson', () => app.names[cnt++]);
    assert.strictEqual(app.selectNextPerson(), 'beta');
    assert.deepStrictEqual(app.selected, ['alpha', 'beta']);
    assert.strictEqual(app.selectNextPerson(), 'gama');
    assert.deepStrictEqual(app.selected, ['alpha', 'beta', 'gama']);
    assert.strictEqual(app.selectNextPerson(), null);
}

// 測試Application的notifySelected方法
async function testApplicationNotifySelected() {
    const app = new Application();
    app.people = ['alpha', 'beta', 'gama'];
    app.selected = ['alpha', 'beta', 'gama'];
    app.mailSystem.send = test.mock.fn(app.mailSystem.send);
    app.mailSystem.write = test.mock.fn(app.mailSystem.write);
    app.notifySelected();
    assert.strictEqual(app.mailSystem.send.mock.calls.length, 3);
    assert.strictEqual(app.mailSystem.write.mock.calls.length, 3);
}

// 分別執行各個測試函數
test('Mock readFile', mockReadFile);
test('MailSystem : write()', testMailSystemWrite);
test('MailSystem : send()', testMailSystemSend);
test('Application : getNames()', testApplicationGetNames);
test('Application : getRandomPerson()', testApplicationGetRandomPerson);
test('Application : selectNextPerson()', testApplicationSelectNextPerson);
test('Application : notifySelected()', testApplicationNotifySelected);
