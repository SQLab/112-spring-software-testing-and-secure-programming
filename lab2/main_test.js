// main_test.js
const test = require('node:test');
const assert = require('assert');
const fs = require('fs').promises;
const { Application, MailSystem } = require('./main');

// Setup and teardown for name_list.txt
test.before(async () => await fs.writeFile('name_list.txt', 'Evangeline\nFinn\nGwendolyn'));
test.after(async () => await fs.unlink('name_list.txt'));

// Test MailSystem
test('MailSystem.write() generates correct message', () => {
  const mailSystem = new MailSystem();
  const message = mailSystem.write('Evangeline');
  assert.strictEqual(message, 'Congrats, Evangeline!');
});

test('MailSystem.send() handles success and failure', () => {
  const mailSystem = new MailSystem();
  const name = 'Finn';
  const context = 'Test message';

  // Mock Math.random for success
  const originalRandom = Math.random;
  Math.random = () => 0.7; // Force success
  assert.ok(mailSystem.send(name, context)); 
  Math.random = originalRandom; // Restore original

  // Mock Math.random for failure
  Math.random = () => 0.3; // Force failure
  assert.ok(!mailSystem.send(name, context));
  Math.random = originalRandom; // Restore original
});

// Test Application
test('Application.getNames() reads and parses names', async () => {
  const app = new Application();
  const [people, selected] = await app.getNames();
  assert.deepStrictEqual(people, ['Evangeline', 'Finn', 'Gwendolyn']);
  assert.deepStrictEqual(selected, []);
});

test('Application.getRandomPerson() returns a random person', () => {
  const app = new Application();
  app.people = ['Evangeline', 'Finn', 'Gwendolyn'];
  const person = app.getRandomPerson();
  assert.ok(app.people.includes(person));
});

test('Application.selectNextPerson() selects and updates', () => {
  const app = new Application();
  app.people = ['Evangeline', 'Finn', 'Gwendolyn'];

  // Select first person
  const firstPerson = app.selectNextPerson();
  assert.ok(app.people.includes(firstPerson));
  assert.strictEqual(app.selected.length, 1);

  // Select until all are selected
  while(app.selectNextPerson()) {}
  assert.strictEqual(app.selectNextPerson(), null); // Returns null when all selected
});

test('Application.notifySelected() sends emails', () => {
  const app = new Application();
  app.people = ['Evangeline', 'Finn'];
  app.selected = ['Evangeline'];

  // Mock mailSystem methods to track calls
  app.mailSystem.write = (name) => {
    assert.strictEqual(name, 'Evangeline');
    return 'Mock message';
  };
  app.mailSystem.send = (name, context) => {
    assert.strictEqual(name, 'Evangeline');
    assert.strictEqual(context, 'Mock message');
    return true; // Assume success
  };

  app.notifySelected();
});
