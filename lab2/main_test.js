const test = require('node:test');
const assert = require('assert');
const fs = require('fs');
test.mock.method(fs, 'readFile', (file, options, callback) => {
    callback(null, 'martin\njohn\ntom');
});
const { Application, MailSystem } = require('./main');

//write tests use Stub, Mock, and Spy when necessary
// TODO: write your tests here
// Remember to use Stub, Mock, and Spy when necessary


const fs = require('fs');
const path = require('path');
test('should name_list.txt ', ()=>{
    const Listna = 'martin\njohn\ntom';
    const tmppa = path.join('name_list.txt');
    fs.writeFileSync(tmppa,Listna);
    process.on('exit', () => {
        if (tmppa) {
         fs.unlinkSync(tmppa);
        }
    });
test('MailSystem_write()', () => {
    const ms = new MailSystem();
    assert.strictEqual(ms.write('martin'), 'Congrats, martin!');
    assert.strictEqual(ms.write(null), 'Congrats, null!');
    assert.strictEqual(ms.write(48763), 'Congrats, 48763!');
});

test('should be able to write mail', () => {
    const mailSystem = new MailSystem();
    assert.strictEqual(mailSystem.write('test'), 'Congrats, test!');
    assert.strictEqual(mailSystem.write(null), 'Congrats, null!');
    assert.strictEqual(mailSystem.write(1111), 'Congrats, 1111!');
});

test('should be able to send mail', () => {
    const mailSystem = new MailSystem();
    const success = mailSystem.send('test', 'test');
    test.mock.method(Math, 'random', () => 1);
    assert.strictEqual(mailSystem.send('ok', 'success'),true);
test('MailSystem_send()', () => {
    const ms = new MailSystem();
    const name = 'martin';
    test.mock.method(Math, 'random', () => 0.6);
    assert.strictEqual(ms.send(name, 'success'), true);
    test.mock.method(Math, 'random', () => 0.4);
    assert.strictEqual(mailSystem.send('fa', 'fail'),false);
});   

test('should be able to get names', async () => {
    const app = new Application();
    const [names,sel] = await app.getNames('martin', 'john', 'tom');
    assert.deepStrictEqual(names, ['martin', 'john', 'tom']);
    assert.deepStrictEqual(sel, []);
    assert.strictEqual(ms.send(name, 'fail'), false);
});

test('should selected', () => {
test('Application_getNames()', async () => {
    const app = new Application();
    app.pe= ['martin', 'john', 'tom'];
    app.sel = ['martin', 'john', 'tom'];
    const result = app.selectNextPerson();
    assert.strictEqual(result, null);
    const name_list = ['martin', 'john', 'tom'];
    const names = await app.getNames();
    assert.deepStrictEqual(names, [name_list, []])
});


test('should be able to get random person',  async (test) => {
test('Application_getRandomPerson()', async (test) => {
    const app = new Application();
    const names = await app.getNames();
    test.mock.method(Math, 'random', () => 0);
@@ -59,28 +42,26 @@ test('should be able to get random person',  async (test) => {
    assert.strictEqual(app.getRandomPerson(), 'john');
    test.mock.method(Math, 'random', () => 0.7);
    assert.strictEqual(app.getRandomPerson(), 'tom');

});

test('should be able to select next person', async (test) => {
test('Application_selectNextPerson()', async (test) => {
    const app = new Application();
    const person = await app.getNames();
    const names = await app.getNames();
    app.selected = ['martin'];
    let cn = 0;
    let cnt = 0;
    test.mock.method(app, 'getRandomPerson', () => {
        if (cn <= person.length) { 
            return person[0][cn++]; 
        if (cnt <= names.length) { 
            return names[0][cnt++]; 
        }
     });
    });
    assert.strictEqual(app.selectNextPerson(), 'john');
    assert.deepStrictEqual(app.selected, ['martin', 'john']);
    assert.strictEqual(app.selectNextPerson(), 'tom');
    assert.deepStrictEqual(app.selected, ['martin', 'john', 'tom']);
    assert.strictEqual(app.selectNextPerson(), null);

});

test('should be able to notify selected', () => {
test('Application_notifySelected()', async (test) => {
    const app = new Application();
    app.people = ['martin', 'john', 'tom'];
    app.selected = ['martin', 'john', 'tom'];
@@ -89,36 +70,4 @@ test('should be able to notify selected', () => {
    app.notifySelected();
    assert.strictEqual(app.mailSystem.send.mock.calls.length, 3);
    assert.strictEqual(app.mailSystem.write.mock.calls.length, 3);

});

test('should not been selected ', () => {
    const app = new Application();
    let getRandomPersonCallCount = 0;
    app.getRandomPerson = () => {
        switch (getRandomPersonCallCount++) {
            case 0:
                return 'martin';
            case 1:
                return 'john';
            case 2:
                return 'tom';
        }
    };
    app.selected = ['martin', 'john'];
    const result = app.selectNextPerson();
    assert.strictEqual(result, 'tom'); 
    assert.strictEqual(getRandomPersonCallCount, 3); 
});     

test('should write and send person', () => {
     const app = new Application();
     this.writeCallCount = 0;
     this.sendCallCount = 0;
     this.writeCallCount++;
     this.sendCallCount++;
     app.selected = ['martin', 'john', 'tom'];
    app.notifySelected();
    assert.strictEqual(this.writeCallCount, 1);
    assert.strictEqual(this.sendCallCount, 1);
});
