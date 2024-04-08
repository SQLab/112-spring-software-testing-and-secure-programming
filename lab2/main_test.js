const TestLab = require('node:test');
const Test = require('node:test');
const assert = require('assert');
const fileSystem = require('fs');

// 模擬 fileSystem 模組的 readFile 方法
TestLab.mock.method(fileSystem, 'readFile', (file, options, callback) => {
Test.mock.method(fileSystem, 'readFile', (file, options, callback) => {
    callback(null, 'ray\nnina\neric');
});

const { Application, MailSystem } = require('./main');

// 測試 MailSystem 的 write 方法
TestLab('MailSystem_write()', () => {
Test('MailSystem_write()', () => {
    const mailSystem = new MailSystem();
    assert.strictEqual(mailSystem.write('ray'), 'Congrats, ray!');
    assert.strictEqual(mailSystem.write(null), 'Congrats, null!');
    assert.strictEqual(mailSystem.write('3345678'), 'Congrats, 3345678!');
});

// 測試 MailSystem 的 send 方法
TestLab('MailSystem_send()', () => {
Test('MailSystem_send()', () => {
    const mailSystem = new MailSystem();
    const name = 'ray';
    TestLab.mock.method(Math, 'random', () => 0.7); // 成功概率高
    Test.mock.method(Math, 'random', () => 0.7); 
    assert.strictEqual(mailSystem.send(name, 'success'), true);
    TestLab.mock.method(Math, 'random', () => 0.3); // 失敗概率高
    Test.mock.method(Math, 'random', () => 0.3); 
    assert.strictEqual(mailSystem.send(name, 'fail'), false);
});

// 測試 Application 的 getNames 方法
TestLab('Application_getNames()', async () => {
Test('Application_getNames()', async () => {
    const application = new Application();
    const nameList = ['ray', 'nina', 'eric'];
    const names = await application.getNames();
    assert.deepStrictEqual(names, [nameList, []]);
});

// 測試 Application 的 getRandomPerson 方法
TestLab('Application_getRandomPerson()', async () => {
Test('Application_getRandomPerson()', async () => {
    const application = new Application();
    const names = await application.getNames();
    TestLab.mock.method(Math, 'random', () => 0);
    Test.mock.method(Math, 'random', () => 0);
    assert.strictEqual(application.getRandomPerson(), 'ray');
    TestLab.mock.method(Math, 'random', () => 0.4);
    Test.mock.method(Math, 'random', () => 0.4);
    assert.strictEqual(application.getRandomPerson(), 'nina');
    TestLab.mock.method(Math, 'random', () => 0.7);
    Test.mock.method(Math, 'random', () => 0.7);
    assert.strictEqual(application.getRandomPerson(), 'eric');
});

// 測試 Application 的 selectNextPerson 方法
TestLab('Application_selectNextPerson()', async () => {
Test('Application_selectNextPerson()', async () => {
    const application = new Application();
    const names = await application.getNames();
    application.selected = ['ray'];
    let counter = 0;
    TestLab.mock.method(application, 'getRandomPerson', () => {
    Test.mock.method(application, 'getRandomPerson', () => {
        if (counter < names[0].length) { 
            return names[0][counter++]; 
        } else {
@@ -68,12 +68,12 @@ TestLab('Application_selectNextPerson()', async () => {
});

// 測試 Application 的 notifySelected 方法
TestLab('Application_notifySelected()', async () => {
Test('Application_notifySelected()', async () => {
    const application = new Application();
    application.people = ['ray', 'nina', 'eric'];
    application.selected = ['ray', 'nina', 'eric'];
    application.mailSystem.send = TestLab.mock.fn(application.mailSystem.send);
    application.mailSystem.write = TestLab.mock.fn(application.mailSystem.write);
    application.mailSystem.send = Test.mock.fn(application.mailSystem.send);
    application.mailSystem.write = Test.mock.fn(application.mailSystem.write);
    application.notifySelected();
    assert.strictEqual(application.mailSystem.send.mock.calls.length, 3);
    assert.strictEqual(application.mailSystem.write.mock.calls.length, 3);
