const test = require('node:test');
const assert = require('assert');
const fs = require('fs');


test.mock.method(fs, 'readFile', (file, options, callback) => {
    callback(null, 'Alice\njohn\nBob');
});

const { Application, MailSystem } = require('./main');


test('Test MailSystem_write() ', () => {
    const mailSystem = new MailSystem();
    
    assert.equal(mailSystem.write('John'), 'Congrats, John!', 'Write method should return the correct context');
    assert.equal(mailSystem.write(null), 'Congrats, null!');
  });
  

test('Test MailSystem_send()_Random', () => {
    const mailSystem = new MailSystem();
    const name = 'John';
    const context = 'test';
  
    // Override Math.random to always return 0.6
    test.mock.method(Math, 'random', () => 0.6);
    assert(mailSystem.send(name, context));
  
    // Override Math.random to return 0.4
    test.mock.method(Math, 'random', () => 0.4);
    assert(!mailSystem.send(name, context));
  });
  
class GetNamesStub {
    constructor(people) {
      this.people = people;
    }
  
    async getNames() {
      const selected = [];
      return [this.people, selected];
    }
  }
 
test('getNames() ', async () => {
    const getNamesStub = new GetNamesStub(['Alice', 'Bob', 'Charlie']);
    const app = new Application();
    app.getNames = getNamesStub.getNames.bind(getNamesStub);
  
    const [people, selected] = await app.getNames();
    assert.deepStrictEqual(people, ['Alice', 'Bob', 'Charlie'], 'People array should match expected value');
    assert.deepStrictEqual(selected, [], 'Selected array should be empty');
  });


test('Test Application_getRandomPerson()', async () => {
    const app = new Application();
    const names = await app.getNames();
    const randomPerson = app.getRandomPerson();
    assert.ok(names[0].includes(randomPerson));                       
});

test('Test Application_selectNextPerson()', async () => {
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

test('Test Application_notifySelected()', async () => {
    const app = new Application();
    app.people = ['AA', 'BB', 'CC'];
    app.selected = ['AA', 'BB', 'CC'];
    app.mailSystem.send = test.mock.fn(app.mailSystem.send);
    app.mailSystem.write = test.mock.fn(app.mailSystem.write);
    app.notifySelected();
    assert.strictEqual(app.mailSystem.send.mock.calls.length, 3);
    assert.strictEqual(app.mailSystem.write.mock.calls.length, 3);
});
