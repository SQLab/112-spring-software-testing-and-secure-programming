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
//a
test('Test MockMailSystem', () => {
  const app = new Application();
  const mockMailSystem = new MockMailSystem();
  app.mailSystem = mockMailSystem;
  app.selected = ['John', 'Jane']; 
  app.notifySelected();

  assert.strictEqual(mockMailSystem.writeCalled, true); 
  assert.strictEqual(mockMailSystem.sendCalled, true); 
});
