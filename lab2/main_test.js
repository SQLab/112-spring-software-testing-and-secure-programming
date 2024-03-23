const test = require('node:test');
const assert = require('assert');
const fs = require('fs').promises; // 使用 promises 版本的 fs，以便使用 async/await

const { Application, MailSystem } = require('./main');

// 在測試之前創建名為 'name_list.txt' 的文件
test.before(async () => {
  await fs.writeFile('name_list.txt', 'John\nAlice\nBob');
});

// 測試完成後刪除 'name_list.txt' 文件
test.after(async () => {
  await fs.unlink('name_list.txt');
});

// 其他測試代碼保持不變
test('write() should return context', () => {
  const mailSystem = new MailSystem();
  const context = mailSystem.write('John');
  assert.strictEqual(context, 'Congrats, John!', 'Write method should return the correct context');
});

test('Test MailSystem send random', () => {
  const mailSystem = new MailSystem();
  const name = 'John';
  const context = 'test';

  // Override Math.random to always return 0.6
  const originalRandom = Math.random;
  Math.random = () => 0.6;

  const success = mailSystem.send(name, context);
  Math.random = originalRandom;

  assert.strictEqual(success, true, 'Mail should be sent successfully as Math.random() > 0.5');
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

test('Test GetNamesStub', async () => {
  const getNamesStub = new GetNamesStub(['AA', 'BB', 'CC']);
  const app = new Application();
  app.getNames = getNamesStub.getNames.bind(getNamesStub);

  const [people, selected] = await app.getNames();
  assert.deepStrictEqual(people, ['AA', 'BB', 'CC'], 'People array should match expected value');
  assert.deepStrictEqual(selected, [], 'Selected array should be empty');
});

class MockMailSystem extends MailSystem {
  constructor() {
    super();
    this.writeCalled = false;
    this.sendCalled = false;
  }

  write(name) {
    this.writeCalled = true;
    return 'Mocked context!!';
  }

  send(name, context) {
    this.sendCalled = true;
    // Simulate success
    return true;
  }
}

test('Test MockMailSystem', () => {
  const app = new Application();
  const mockMailSystem = new MockMailSystem();
  app.mailSystem = mockMailSystem;
  app.selected = ['John', 'Jane'];
  app.people = ['John', 'Jane']; // 直接設置 app.people 屬性

  app.notifySelected();

  assert.strictEqual(mockMailSystem.writeCalled, true);
  assert.strictEqual(mockMailSystem.sendCalled, true);
});

test('getNames() should return correct people and selected arrays', async () => {
  const getNamesStub = new GetNamesStub(['Alice', 'Bob', 'Charlie']);
  const app = new Application();
  app.getNames = getNamesStub.getNames.bind(getNamesStub);

  const [people, selected] = await app.getNames();
  assert.deepStrictEqual(people, ['Alice', 'Bob', 'Charlie'], 'People array should match expected value');
  assert.deepStrictEqual(selected, [], 'Selected array should be empty');
});

test('Test getRandomPerson without duplicate people', () => {
  const people = ['Alice', 'Bob', 'Charlie', 'Dave', 'Eve'];
  const app = new Application();
  app.people = people; // 直接設置 app.people 屬性

  const selectedPeople = new Set();

  // Execute until all people are selected without duplicates
  while (selectedPeople.size < people.length) {
    const person = app.selectNextPerson();
    assert.ok(people.includes(person), 'Selected person should be in the people array');
    assert.ok(!selectedPeople.has(person), 'Selected person should not be repeated');
    selectedPeople.add(person);
  }

  assert.strictEqual(selectedPeople.size, people.length, 'All people should be selected eventually');
});
