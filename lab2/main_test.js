
const test = require('node:test');
const assert = require('assert');
const fs = require('fs');

// 模擬 fs.readFile ，返回假數據
test.mock.method(fs, 'readFile', (file, options, callback) => {
    callback(null, 'Alice\njohn\nBob');
});

// 從 main.js 導入 Application 和 MailSystem 類
const { Application, MailSystem } = require('./main');

// testMailSystem_write() 
test('MailSystem_write()', () => {
    const ms = new MailSystem();
    assert.equal(ms.write('Alice'), 'Congrats, Alice!');
    assert.equal(ms.write(null), 'Congrats, null!');
    assert.equal(ms.write(512558020), 'Congrats, 512558020!');  
});

// test MailSystem_send() 
test('MailSystem_send()', () => {
    const ms = new MailSystem();
    const name = 'Alice';
    test.mock.method(Math, 'random', () => 0.6);                      
    assert.equal(ms.send(name, 'success'), true);             
    test.mock.method(Math, 'random', () => 0.4);                     
    assert.equal(ms.send(name, 'fail'), false);                 
});

// test Application_getNames() 
test('Application_getNames()', async () => {
    const app = new Application();
    const name_list = ['Alice', 'john', 'Bob'];
    const names = await app.getNames();
    assert.deepStrictEqual(names, [name_list, []]);                   
});

// test Application_getRandomPerson() 
test('Application_getRandomPerson()', async () => {
    const app = new Application();
    const names = await app.getNames();
    const randomPerson = app.getRandomPerson();
    assert.ok(names[0].includes(randomPerson));                       
});

// test Application_selectNextPerson() 
test('Application_selectNextPerson()', async () => {
    const app = new Application();
    const names = await app.getNames();
    app.selected = ['Alice'];
    let cnt = 0;
    test.mock.method(app, 'getRandomPerson', () => {
        if (cnt <= names[0].length) { 
            return names[0][cnt++]; 
        }
    });
    assert.strictEqual(app.selectNextPerson(), 'john');               
    assert.deepStrictEqual(app.selected, ['Alice', 'john']);          
    assert.strictEqual(app.selectNextPerson(), 'Bob');                
    assert.deepStrictEqual(app.selected, ['Alice', 'john', 'Bob']);   
    assert.strictEqual(app.selectNextPerson(), null);                 
});

// test Application_notifySelected() 
test('Application_notifySelected()', async () => {
    const app = new Application();
    app.people = ['Alice', 'john', 'Bob'];
    app.selected = ['Alice', 'john', 'Bob'];
    app.mailSystem.send = test.mock.fn(app.mailSystem.send);
    app.mailSystem.write = test.mock.fn(app.mailSystem.write);
    app.notifySelected();
    assert.strictEqual(app.mailSystem.send.mock.calls.length, 3);     
    assert.strictEqual(app.mailSystem.write.mock.calls.length, 3);    
});
