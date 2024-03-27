const test = require('node:test');
const assert = require('assert');
const fs = require('fs');

test.mock.method(fs, 'readFile', (file, options, callback) => {
    callback(null, 'aaa\nbbb\nccc');
});

 
const { Application, MailSystem } = require('./main');


test('MailSystem_write()', () => {
    const ms = new MailSystem();
    assert.strictEqual(ms.write('aaa'), 'Congrats, aaa!');        
    assert.strictEqual(ms.write(511558014), 'Congrats, 511558014!');  
    assert.strictEqual(ms.write(null), 'Congrats, null!');           
});


test('MailSystem_send()', () => {
    const ms = new MailSystem();
    const name = 'aaa';
    test.mock.method(Math, 'random', () => 0.6);                      
    assert.strictEqual(ms.send(name, 'success'), true);               
    test.mock.method(Math, 'random', () => 0.4);                      
    assert.strictEqual(ms.send(name, 'fail'), false);                
});


test('Application_getNames()', async () => {
    const app = new Application();
    const name_list = ['aaa', 'bbb', 'ccc'];
    const names = await app.getNames();
    assert.deepStrictEqual(names, [name_list, []]);                   
});

test('Application_getRandomPerson()', async () => {
    const app = new Application();
    const [names] = await app.getNames();                             
    const randomPerson = app.getRandomPerson();
    assert.ok(names.includes(randomPerson));                          
});


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
    assert.strictEqual(app.selectNextPerson(), 'bbb');               
    assert.deepStrictEqual(app.selected, ['aaa', 'bbb']);          
    assert.strictEqual(app.selectNextPerson(), 'ccc');                
    assert.deepStrictEqual(app.selected, ['aaa', 'bbb', 'ccc']);   
    assert.strictEqual(app.selectNextPerson(), null);                 
});


test('Application_notifySelected()', async () => {
    const app = new Application();
    const [people] = await app.getNames();
    app.selected = [...people];
    app.mailSystem.send = test.mock.fn(app.mailSystem.send);
    app.mailSystem.write = test.mock.fn(app.mailSystem.write);
    app.notifySelected();
    assert.strictEqual(app.mailSystem.send.mock.calls.length, people.length); 
    assert.strictEqual(app.mailSystem.write.mock.calls.length, people.length); 
});


test('Dummy Object - MailSystem', () => {
    class DummyMailSystem extends MailSystem {
        send(name, status) {
        }
        write(name) {
        }
    }

    const dummyMailSystem = new DummyMailSystem();

    assert.strictEqual(dummyMailSystem.write('aaa'), undefined);
    assert.strictEqual(dummyMailSystem.send('aaa', 'success'), undefined); 
});
