const TestLab = require('node:test');
const assert = require('assert');
const fileSystem = require('fs');

// 模擬 fileSystem 模組的 readFile 方法
TestLab.mock.method(fileSystem, 'readFile', (file, options, callback) => {
    callback(null, 'amidofo\nguaninma\nyasu');
});

const { Application, MailSystem } = require('./main');

// 測試 MailSystem 的 write 方法
TestLab('MailSystem_write()', () => {
    const Mailsys = new MailSystem();
    assert.strictEqual(Mailsys.write('amidofo'), 'Congrats, amidofo!');
    assert.strictEqual(Mailsys.write(null), 'Congrats, null!');
    assert.strictEqual(Mailsys.write('3345678'), 'Congrats, 3345678!');
});

// 測試 MailSystem 的 send 方法
TestLab('MailSystem_send()', () => {
    const Mailsys = new MailSystem();
    const name = 'amidofo';
    TestLab.mock.method(Math, 'random', () => 0.7); // 成功概率高
    assert.strictEqual(Mailsys.send(name, 'success'), true);
    TestLab.mock.method(Math, 'random', () => 0.3); // 失敗概率高
    assert.strictEqual(Mailsys.send(name, 'fail'), false);
});

// 測試 Application 的 getNames 方法
TestLab('Application_getNames()', async () => {
    const application = new Application();
    const nameList = ['amidofo', 'guaninma', 'yasu'];
    const names = await application.getNames();
    assert.deepStrictEqual(names, [nameList, []]);
});

// 測試 Application 的 getRandomPerson 方法
TestLab('Application_getRandomPerson()', async () => {
    const application = new Application();
    const names = await application.getNames();
    TestLab.mock.method(Math, 'random', () => 0);
    assert.strictEqual(application.getRandomPerson(), 'amidofo');
    TestLab.mock.method(Math, 'random', () => 0.4);
    assert.strictEqual(application.getRandomPerson(), 'guaninma');
    TestLab.mock.method(Math, 'random', () => 0.7);
    assert.strictEqual(application.getRandomPerson(), 'yasu');
});

// 測試 Application 的 selectNextPerson 方法
TestLab('Application_selectNextPerson()', async () => {
    const application = new Application();
    const names = await application.getNames();
    application.selected = ['amidofo'];
    let counter = 0;
    TestLab.mock.method(application, 'getRandomPerson', () => {
        if (counter <= names.length) { 
            return names[0][counter++]; 
        }
    });
    assert.strictEqual(application.selectNextPerson(), 'guaninma');
    assert.deepStrictEqual(application.selected, ['amidofo', 'guaninma']);
    assert.strictEqual(application.selectNextPerson(), 'yasu');
    assert.deepStrictEqual(application.selected, ['amidofo', 'guaninma', 'yasu']);
    assert.strictEqual(application.selectNextPerson(), null);
});

// 測試 Application 的 notifySelected 方法
TestLab('Application_notifySelected()', async () => {
    const application = new Application();
    application.people = ['amidofo', 'guaninma', 'yasu'];
    application.selected = ['amidofo', 'guaninma', 'yasu'];
    application.mailSystem.send = TestLab.mock.fn(application.mailSystem.send);
    application.mailSystem.write = TestLab.mock.fn(application.mailSystem.write);
    application.notifySelected();
    assert.strictEqual(application.mailSystem.send.mock.calls.length, 3);
    assert.strictEqual(application.mailSystem.write.mock.calls.length, 3);
});
