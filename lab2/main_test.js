const test = require('node:test');
const assert = require('assert');
const EventEmitter = require('events');
const { Application, MailSystem } = require('./main');

class GetNamesStub extends EventEmitter  {
    async getNames() {
      this.emit('getNames', null, [['AA', 'BB', 'CC'], []]);
      return [['AA', 'BB', 'CC'], []];
    }
}
  
test('Test GetNamesStub', async () => {
    const getNamesStub = new GetNamesStub();
    const app = new Application();
    app.getNames = getNamesStub.getNames.bind(getNamesStub);
  
    const [people, selected] = await app.getNames();
    assert.deepStrictEqual(people, ['AA', 'BB', 'CC']);
    assert.deepStrictEqual(selected, []);
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
  app.selected = ['John', 'Jane']; // 添加一些已选中的人
  app.notifySelected();

  assert.strictEqual(mockMailSystem.writeCalled, true); // 使用 assert 断言 write 方法被调用
  assert.strictEqual(mockMailSystem.sendCalled, true); // 使用 assert 断言 send 方法被调用
});
