const test = require('node:test');
const assert = require('assert');
const fs = require('fs');

// 模擬 fs.readFile 方法，返回假數據
test.mock.method(fs, 'readFile', (file, options, callback) => {
    callback(null, 'aaa\nbbb\nccc');
});

// 從 main.js 導入 Application 和 MailSystem 
const { Application, MailSystem } = require('./main');

// 測試 MailSystem_write() 方法
test('MailSystem_write()', () => {
    const ms = new MailSystem();
    assert.strictEqual(ms.write('aaa'), 'Congrats, aaa!');        // 確認寫入郵件的功能
    assert.strictEqual(ms.write(511558018), 'Congrats, 511558018!');  // 確認處理數字名稱的功能
    assert.strictEqual(ms.write(null), 'Congrats, null!');            // 確認處理空值的功能   
});

// 測試 MailSystem_send() 方法
test('MailSystem_send()', () => {
    const ms = new MailSystem();
    const name = 'aaa';
    test.mock.method(Math, 'random', () => 0.6);                      // 假設 Math.random() 始終返回 0.6
    assert.strictEqual(ms.send(name, 'success'), true);               // 確認發送成功郵件的功能
    test.mock.method(Math, 'random', () => 0.4);                      // 假設 Math.random() 始終返回 0.4
    assert.strictEqual(ms.send(name, 'fail'), false);                 // 確認發送失敗郵件的功能
});

// 測試 Application_getNames() 方法
test('Application_getNames()', async () => {
    const app = new Application();
    const name_list = ['aaa', 'bbb', 'ccc'];
    const names = await app.getNames();
    assert.deepStrictEqual(names, [name_list, []]);                   // 確認獲取名字列表的功能
});

// 測試 Application_getRandomPerson() 方法
test('Application_getRandomPerson()', async () => {
    const app = new Application();
    const [names] = await app.getNames();                             // 等待獲取名字列表
    const randomPerson = app.getRandomPerson();
    assert.ok(names.includes(randomPerson));                          // 確認隨機獲取的人員在名字列表中
});

// 測試 Application_selectNextPerson() 方法
test('Application_selectNextPerson()', async () => {
    const app = new Application();
    const [names] = await app.getNames();
    app.selected = ['aaa'];
    let cnt = 0;
    test.mock.method(app, 'getRandomPerson', () => {
        if (cnt <= names.length) { 
            return names[cnt++]; 
        }
    });
    assert.strictEqual(app.selectNextPerson(), 'bbb');               // 確認選擇下一個人員的功能
    assert.deepStrictEqual(app.selected, ['aaa', 'bbb']);          // 確認已選擇的人員列表
    assert.strictEqual(app.selectNextPerson(), 'ccc');                // 確認選擇下一個人員的功能
    assert.deepStrictEqual(app.selected, ['aaa', 'bbb', 'ccc']);   // 確認已選擇的人員列表
    assert.strictEqual(app.selectNextPerson(), null);                 // 確認已無可選擇的人員
});

// 測試 Application_notifySelected() 方法
test('Application_notifySelected()', async () => {
    const app = new Application();
    const [people] = await app.getNames();
    app.selected = [...people];
    app.mailSystem.send = test.mock.fn(app.mailSystem.send);
    app.mailSystem.write = test.mock.fn(app.mailSystem.write);
    app.notifySelected();
    assert.strictEqual(app.mailSystem.send.mock.calls.length, people.length);  // 確認發送郵件的次數
    assert.strictEqual(app.mailSystem.write.mock.calls.length, people.length); // 確認編寫郵件的次數
});

// 測試 Dummy Object - MailSystem
test('Dummy Object - MailSystem', () => {
    class DummyMailSystem extends MailSystem {
        send(name, status) {
        }
        write(name) {
        }
    }

    const dummyMailSystem = new DummyMailSystem();

    assert.strictEqual(dummyMailSystem.write('aaa'), undefined); // 測試編寫郵件的功能
    assert.strictEqual(dummyMailSystem.send('aaa', 'success'), undefined); // 測試發送成功郵件的功能
});
