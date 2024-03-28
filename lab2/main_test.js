const test = require('node:test');
const assert = require('assert');
const fs = require('fs');

// 模擬 fs.readFile 方法
test.mock.method(fs, 'readFile', (filePath, encoding, callback) => {
    const mockData = 'data1\ndata2\ndata3';
    callback(null, mockData);
});

const { Application, MailSystem } = require('./main');
// 測試 MailSystem 的 write 方法
test('MailSystem.write', async (t) => {
    const mailSys = new MailSystem();
    assert.strictEqual(mailSys.write('data1'), 'Congrats, data1!');
    assert.strictEqual(mailSys.write(''), 'Congrats, !');
    assert.strictEqual(mailSys.write('data2'), 'Congrats, data2!');
});

// 測試 MailSystem 的 send 方法
test('MailSystem.send', async (t) => {
    const mailSys = new MailSystem();
    // 模擬成功發送郵件的情況
    test.mock.method(Math, 'random', () => 0.9);
    assert.strictEqual(mailSys.send('data1', 'Mail content for data1'), true);
    // 模擬發送郵件失敗的情況
    test.mock.method(Math, 'random', () => 0.1);
    assert.strictEqual(mailSys.send('data2', 'Mail content for data2'), false);
});

// 測試 Application.getNames 方法
test('Application_getNames()', async () => {
    const application = new Application();
    const expectedNames = ['data1', 'data2', 'data3'];
    const names = await application.getNames();
    assert.deepStrictEqual(names[0], expectedNames);
});

// 測試 Application.getRandomPerson 方法
test('Application_getRandomPerson()', async () => {
    const application = new Application();
    await new Promise(resolve => setTimeout(resolve, 100)); // 等待異步初始化完成

    test.mock.method(Math, 'random', () => 0); // 模擬選擇第一個人
    assert.strictEqual(application.getRandomPerson(), 'data1');

    test.mock.method(Math, 'random', () => 0.5); // 模擬選擇第二個人
    assert.strictEqual(application.getRandomPerson(), 'data2');

    test.mock.method(Math, 'random', () => 0.99); // 模擬選擇最後一個人
    assert.strictEqual(application.getRandomPerson(), 'data3');
});

// 測試 Application.selectNextPerson 方法
test('Application_selectNextPerson()', async () => {
    const application = new Application();
    await new Promise(resolve => setTimeout(resolve, 100)); // 等待異步初始化完成

    application.selected = ['data1'];
    let counter = 0;
    test.mock.method(application, 'getRandomPerson', () => {
        return ['data1', 'data2', 'data3'][counter++];
    });

    assert.strictEqual(application.selectNextPerson(), 'data2');
    assert.deepStrictEqual(application.selected, ['data1', 'data2']);
    assert.strictEqual(application.selectNextPerson(), 'data3');
    assert.deepStrictEqual(application.selected, ['data1', 'data2', 'data3']);
    assert.strictEqual(application.selectNextPerson(), null);
});

// 測試 Application.notifySelected 方法
test('Application_notifySelected()', async () => {
    const application = new Application();
    application.people = ['data1', 'data2', 'data3'];
    application.selected = ['data1', 'data2', 'data3'];
    application.mailSystem.send = test.mock.fn(application.mailSystem.send);
    application.mailSystem.write = test.mock.fn(application.mailSystem.write);
    application.notifySelected();
    assert.strictEqual(application.mailSystem.send.mock.calls.length, 3);
    assert.strictEqual(application.mailSystem.write.mock.calls.length, 3);
});
