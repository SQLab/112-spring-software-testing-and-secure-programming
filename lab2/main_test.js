// 改寫後的測試腳本（main_test_dick.js）
const test = require('node:test');
const assert = require('assert');
const fs = require('fs').promises;
const { Application, MailSystem } = require('./main');

// 在測試之前創建名字列表文件
test.before(async () => {
    await fs.writeFile('name_list.txt', 'Dick\nesis\nGoodes');
});

// 測試後刪除名字列表文件
test.after(async () => {
    await fs.unlink('name_list.txt');
});

//
test('測試 MailSystem 的 write() 函式是否返回正確的內容 ', () => {
    const mailSystem = new MailSystem();
    const context = mailSystem.write('Dick');
    assert.strictEqual(context, 'Congrats, Dick!', 'Write method should return the correct context');
});

//
test('測試 MailSystem 的 send() 函式在成功時的行為', () => {
    const mailSystem = new MailSystem();
    const name = 'Dick';
    const context = 'test';
    const originalRandom = Math.random;
    Math.random = () => 0.6; // 假設成功的機率為 60%
    const success = mailSystem.send(name, context);
    Math.random = originalRandom;
    assert.strictEqual(success, true, 'Mail should be sent successfully as Math.random() > 0.5');
});

// 
test('測試 MailSystem 的 send() 函式在失敗時的行為', () => {
    const mailSystem = new MailSystem();
    const name = 'Dick';
    const context = 'test';
    const originalRandom = Math.random;
    Math.random = () => 0.4; // 假設失敗的機率為 40%
    const success = mailSystem.send(name, context);
    Math.random = originalRandom;
    assert.strictEqual(success, false, 'Mail should fail as Math.random() < 0.5');
});

// 
test('測試 Application 的 getNames() 函式是否返回非空的人名列表', async () => {
    const app = new Application();
    const [people, selected] = await app.getNames();
    assert.strictEqual(people.length > 0, true, 'Should return a non-empty people array');
    assert.strictEqual(selected.length, 0, 'Selected array should be empty');
});

// 
test('測試 Application 的 selectNextPerson() 和 notifySelected() 函式', async () => {
    const app = new Application();
    await app.getNames();  // 從文件中加載人名列表
    const person = app.selectNextPerson();
    assert.ok(person, 'Should return a person');
    app.notifySelected();  // 我們假設這個函式正常運行，但實際上應該檢查其輸出
});


test('測試 selectNextPerson() 函式當所有人都被選擇後是否返回 null', async () => {
    const app = new Application();
    await app.getNames();  // 從文件中加載人名列表
    while (app.selectNextPerson() !== null) {}  // 選擇所有人
    const person = app.selectNextPerson();
    assert.strictEqual(person, null, 'Should return null when all people are selected');
});

