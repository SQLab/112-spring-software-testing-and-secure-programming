// 改寫後的測試腳本（main_DickTest_dick.js）
const DickTest = require('node:test');
const assert = require('assert');
const fs = require('fs').promises;
const { Application, MailSystem } = require('./main');

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
    const stub = Math.random;
    Math.random = () => 0.6;
    const success = MainTest.send(name, context);
    Math.random = stub;
    assert.strictEqual(success, true, '測試成功值在0.5以上');
});

DickTest('MailSystem send() failure', () => {
    const MainTest = new MailSystem();
    const name = 'Dick';
    const context = 'DickTest';
    const stub = Math.random;
    Math.random = () => 0.4;
    const success = MainTest.send(name, context);
    Math.random = stub;
    assert.strictEqual(success, false, '測試失敗值在0.5以下');
});

DickTest('Application getNames()', async () => {
    const app = new Application();
    const [people, selected] = await app.getNames();
    assert(people.length > 0, '陣列不為空');
    assert.strictEqual(selected.length, 0, '陣列為空');
});

DickTest('Application selectNextPerson() and notifySelected()', async () => {
    const app = new Application();
    await app.getNames();
    const person = app.selectNextPerson();
    assert.ok(person, '選擇一個人');
    app.notifySelected();
});

DickTest('selectNextPerson() when all people are selected', async () => {
    const app = new Application();
    await app.getNames();
    while (app.selectNextPerson() !== null) {}
    assert.strictEqual(app.selectNextPerson(), null, '全選時回傳null');
});
