const test = require('node:test');
const assert = require('assert');
const fs = require('fs');

// 模擬 fs.readFile 方法，返回假數據
test.mock.method(fs, 'readFile', (file, options, callback) => {
    callback(null, 'Alice\njohn\nBob');
});

// 從 main.js 導入 Application 和 MailSystem 類
const { Application, MailSystem } = require('./main');

// 測試 MailSystem_write() 方法
test('MailSystem_write()', () => {
    const ms = new MailSystem();
    assert.strictEqual(ms.write('Alice'), 'Congrats, Alice!');        // 確認寫入郵件的功能
    assert.strictEqual(ms.write(null), 'Congrats, null!');            // 確認處理空值的功能
    assert.strictEqual(ms.write(512558014), 'Congrats, 512558014!');  // 確認處理數字名稱的功能
});

// 測試 MailSystem_send() 方法
test('MailSystem_send()', () => {
    const ms = new MailSystem();
    const name = 'Alice';
    test.mock.method(Math, 'random', () => 0.6);                      // 假設 Math.random() 始終返回 0.6
    assert.strictEqual(ms.send(name, 'success'), true);               // 確認發送成功郵件的功能
    test.mock.method(Math, 'random', () => 0.4);                      // 假設 Math.random() 始終返回 0.4
    assert.strictEqual(ms.send(name, 'fail'), false);                 // 確認發送失敗郵件的功能
});

// 測試 Application_getNames() 方法
test('Application_getNames()', async () => {
    const app = new Application();
    const name_list = ['Alice', 'john', 'Bob'];
    const names = await app.getNames();
    assert.deepStrictEqual(names, [name_list, []]);                   // 確認獲取名字列表的功能
});

// 測試 Application_getRandomPerson() 方法
test('Application_getRandomPerson()', async () => {
    const app = new Application();
    const names = await app.getNames();
    const randomPerson = app.getRandomPerson();
    assert.ok(names[0].includes(randomPerson));                       // 確認隨機獲取的人員在名字列表中
});

// 測試 Application_selectNextPerson() 方法
test('Application_selectNextPerson()', async () => {
    const app = new Application();
    const names = await app.getNames();
    app.selected = ['Alice'];
    let cnt = 0;
    test.mock.method(app, 'getRandomPerson', () => {
        if (cnt <= names.length) { 
            return names[0][cnt++]; 
        }
    });
    assert.strictEqual(app.selectNextPerson(), 'john');               // 確認選擇下一個人員的功能
    assert.deepStrictEqual(app.selected, ['Alice', 'john']);          // 確認已選擇的人員列表
    assert.strictEqual(app.selectNextPerson(), 'Bob');                // 確認選擇下一個人員的功能
    assert.deepStrictEqual(app.selected, ['Alice', 'john', 'Bob']);   // 確認已選擇的人員列表
    assert.strictEqual(app.selectNextPerson(), null);                 // 確認已無可選擇的人員
});

// 測試 Application_notifySelected() 方法
test('Application_notifySelected()', async () => {
    const app = new Application();
    app.people = ['Alice', 'john', 'Bob'];
    app.selected = ['Alice', 'john', 'Bob'];
    app.mailSystem.send = test.mock.fn(app.mailSystem.send);
    app.mailSystem.write = test.mock.fn(app.mailSystem.write);
    app.notifySelected();
    assert.strictEqual(app.mailSystem.send.mock.calls.length, 3);     // 確認發送郵件的次數
    assert.strictEqual(app.mailSystem.write.mock.calls.length, 3);    // 確認編寫郵件的次數
});
