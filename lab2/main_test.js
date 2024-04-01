// 改寫後的測試腳本（main_DickTest_dick.js）
const DickTest = require('node:test');
const assert = require('assert');
const fs = require('fs').promises;
const { Application, MailSystem } = require('./main');

// 自定義的間諜函式，用於替換 Math.random()
function stubMathRandom(value) {
    const originalRandom = Math.random;
    Math.random = () => value;
    return originalRandom;
}

// 自定義的間諜函式，用於監聽 console.log()
function spyConsoleLog() {
    const originalLog = console.log;
    const calls = [];
    console.log = (...args) => {
        calls.push(args.join(' '));
    };
    return { calls, restore: () => console.log = originalLog };
}

DickTest.before(async () => await fs.writeFile('name_list.txt', 'Dick\nesis\nGoodes'));
DickTest.after(async () => await fs.unlink('name_list.txt'));

DickTest('MailSystem write()', () => {
    const MainTest = new MailSystem();
    const context = MainTest.write('Dick');
    assert.strictEqual(context, 'Congrats, Dick!', '');
});

DickTest('MailSystem send() success', () => {
    const MainTest = new MailSystem();
    const name = 'Dick';
    const context = 'DickTest';
    const originalRandom = stubMathRandom(0.6); // 替換 Math.random
    const success = MainTest.send(name, context);
    assert.strictEqual(success, true, '成功值應大於0.5');
    originalRandom(); // 還原 Math.random
});

DickTest('MailSystem send() failure', () => {
    const MainTest = new MailSystem();
    const name = 'Dick';
    const context = 'DickTest';
    const originalRandom = stubMathRandom(0.4); // 替換 Math.random
    const success = MainTest.send(name, context);
    assert.strictEqual(success, false, '失敗值應小於0.5');
    originalRandom(); // 還原 Math.random
});

DickTest('Application getNames()', async () => {
    const app = new Application();
    const [people, selected] = await app.getNames();
    assert(people.length > 0, '人名列表應不為空');
    assert.strictEqual(selected.length, 0, '已選擇列表應為空');
});

DickTest('Application selectNextPerson() and notifySelected()', async () => {
    const app = new Application();
    await app.getNames();
    const person = app.selectNextPerson();
    assert.ok(person, '應該選擇一個人');
    const { calls, restore } = spyConsoleLog(); // 監聽 console.log
    app.notifySelected();
    assert.strictEqual(calls.length, app.selected.length, '應該呼叫log相同次數');
    restore();
});

DickTest('selectNextPerson() when all people are selected', async () => {
    const app = new Application();
    await app.getNames();
    while (app.selectNextPerson() !== null) {}
    assert.strictEqual(app.selectNextPerson(), null, '全選時應回傳null');
});
