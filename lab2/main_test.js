const Test = require('node:test');
const assert = require('assert');
const fs = require('fs').promises;
const { Application, MailSystem } = require('./main');

// Sample name list (modify as needed)
const sampleNames = ['Alice', 'Bob', 'Charlie', 'David', 'Emily'];

// Utility function to create a temporary name_list.txt
async function createNameList(names) {
  await fs.writeFile('name_list.txt', names.join('\n'));
}

// Utility function to remove the temporary name_list.txt
async function removeNameList() {
  await fs.unlink('name_list.txt');
}

Test.beforeEach(async () => await createNameList(sampleNames));
Test.afterEach(async () => await removeNameList());

// --- MailSystem Tests ---

Test('MailSystem.write() generates correct message', () => {
  const mailSystem = new MailSystem();
  const context = mailSystem.write('Alice');
  assert.strictEqual(context, 'Congrats, Alice!', 'Message should match expected format');
});

Test('MailSystem.send() handles success and failure (mocked)', () => {
  const mailSystem = new MailSystem();
  const name = 'Bob';
  const context = 'Test message';

  // Mock Math.random for controlled outcomes
  const originalRandom = Math.random;

  Math.random = () => 0.7; // Simulate success (70% chance)
  let success = mailSystem.send(name, context);
  assert.strictEqual(success, true, 'Should return true on success');

  Math.random = () => 0.3; // Simulate failure (30% chance)
  success = mailSystem.send(name, context);
  assert.strictEqual(success, false, 'Should return false on failure');

  // Restore original Math.random
  Math.random = originalRandom;
});

// --- Application Tests ---

Test('Application.getNames() reads and parses names', async () => {
  const app = new Application();
  const [people, selected] = await app.getNames();
  assert.deepStrictEqual(people, sampleNames, 'People list should match name_list.txt');
  assert.deepStrictEqual(selected, [], 'Selected list should be initially empty');
});

Test('Application.selectNextPerson() selects a random person', async () => {
  const app = new Application();
  await app.getNames();

  const selectedPerson = app.selectNextPerson();
  assert.ok(sampleNames.includes(selectedPerson), 'Selected person should be from the list');
});

Test('Application.selectNextPerson() returns null when all selected', async () => {
  const app = new Application();
  await app.getNames();

  // Select all people
  for (let i = 0; i < sampleNames.length; i++) {
    app.selectNextPerson();
  }

  assert.strictEqual(app.selectNextPerson(), null, 'Should return null when all selected');
});

// --- Application.notifySelected() Test --- (Separate test for clarity)

Test('Application.notifySelected() sends emails to selected people', async () => {
  const app = new Application();
  await app.getNames();

  // Select two people
  app.selectNextPerson();
  app.selectNextPerson();

  // Mock MailSystem.send to verify calls and behavior
  const mockMailSystem = {
    write: (name) => `Mock message for ${name}`,
    send: (name, context) => {
      // Assert expectations here:
      // - Check if name is in the selected list
      // - Check if context matches the expected format
      return true; // Assume success for simplicity
    }
  };
  app.mailSystem = mockMailSystem; 

  app.notifySelected();
});
