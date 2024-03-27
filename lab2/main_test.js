// 引入測試框架和斷言庫
const test = require('node:test');
const assert = require('assert');

// 模擬 fs.readFile 方法，返回假數據
test.mock.method(require('fs'), 'readFile', (file, options, callback) => {
    // 模擬返回的假數據為 'Peter\njack\nBan'
    callback(null, 'Peter\njack\nBan');
});

// 從 main.js 導入 Application 和 MailSystem 類
const { Application, MailSystem } = require('./main');

// 測試 MailSystem_write() 方法
test('MailSystem_write()', () => {
    // 初始化 MailSystem 實例
    const ms = new MailSystem();
    // 確認 write 方法對 'Peter' 的輸出是否為 'Congrats, Peter!'
    assert.strictEqual(ms.write('Peter'), 'Congrats, Peter!');
    // 確認 write 方法對 null 的輸出是否為 'Congrats, null!'
    assert.strictEqual(ms.write(null), 'Congrats, null!');
    // 確認 write 方法對數字 512558011 的輸出是否為 'Congrats, 512558011!'
    assert.strictEqual(ms.write(512558011), 'Congrats, 512558011!');
});

// 測試 MailSystem_send() 方法
test('MailSystem_send()', () => {
    // 初始化 MailSystem 實例
    const ms = new MailSystem();
    // 模擬 Math.random() 始終返回 0.6
    test.mock.method(Math, 'random', () => 0.6);
    // 確認 send 方法對 'Peter' 和 'success' 的輸出是否為 true
    assert.strictEqual(ms.send('Peter', 'success'), true);
    // 模擬 Math.random() 始終返回 0.4
    test.mock.method(Math, 'random', () => 0.4);
    // 確認 send 方法對 'Peter' 和 'fail' 的輸出是否為 false
    assert.strictEqual(ms.send('Peter', 'fail'), false);
});

// 測試 Application_getNames() 方法
test('Application_getNames()', async () => {
    // 初始化 Application 實例
    const app = new Application();
    // 獲取 getNames 方法返回的名字列表
    const [names] = await app.getNames();
    // 確認 getNames 方法返回的名字列表是否為 ['Peter', 'jack', 'Ban']
    assert.deepStrictEqual(names, ['Peter', 'jack', 'Ban']);
});

// 測試 Application_getRandomPerson() 方法
test('Application_getRandomPerson()', async () => {
    // 初始化 Application 實例
    const app = new Application();
    // 獲取 getNames 方法返回的名字列表
    const [names] = await app.getNames();
    // 獲取 getRandomPerson 方法返回的隨機名字
    const randomPerson = app.getRandomPerson();
    // 確認 getRandomPerson 方法返回的隨機名字是否在名字列表中
    assert.ok(names.includes(randomPerson));
});

// 測試 Application_selectNextPerson() 方法
test('Application_selectNextPerson()', async () => {
    // 初始化 Application 實例
    const app = new Application();
    // 獲取 getNames 方法返回的名字列表
    const [names] = await app.getNames();
    // 將 'Peter' 添加到已選擇的人員列表中
    app.selected = ['Peter'];
    // 初始化計數器
    let cnt = 0;
    // 模擬 getRandomPerson 方法的行為
    test.mock.method(app, 'getRandomPerson', () => {
        if (cnt <= names.length) { 
            return names[cnt++]; 
        }
    });
    // 確認 selectNextPerson 方法的第一次返回是否為 'jack'，並檢查已選擇的人員列表
    assert.strictEqual(app.selectNextPerson(), 'jack');
    assert.deepStrictEqual(app.selected, ['Peter', 'jack']);
    // 確認 selectNextPerson 方法的第二次返回是否為 'Ban'，並檢查已選擇的人員列表
    assert.strictEqual(app.selectNextPerson(), 'Ban');
    assert.deepStrictEqual(app.selected, ['Peter', 'jack', 'Ban']);
    // 確認 selectNextPerson 方法的第三次返回是否為 null
    assert.strictEqual(app.selectNextPerson(), null);
});

// 測試 Application_notifySelected() 方法
test('Application_notifySelected()', async () => {
    // 初始化 Application 實例
    const app = new Application();
    // 獲取 getNames 方法返回的名字列表
    const [people] = await app.getNames();
    // 將名字列表中的所有人員都添加到已選擇的人員列表中
    app.selected = [...people];
    // 使用 mock 方法模擬 mailSystem 的 send 和 write 方法
    app.mailSystem.send = test.mock.fn(app.mailSystem.send);
    app.mailSystem.write = test.mock.fn(app.mailSystem.write);
    // 調用 notifySelected 方法
    app.notifySelected();
    // 確認 send 方法被調用的次數是否與人員數量相等
    assert.strictEqual(app.mailSystem.send.mock.calls.length, people.length);
    // 確認 write 方法被調用的次數是否與人員數量相等
    assert.strictEqual(app.mailSystem.write.mock.calls.length, people.length);
});
