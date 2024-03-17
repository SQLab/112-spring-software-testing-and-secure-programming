const test = require('node:test');
const assert = require('assert');
const { Application, MailSystem } = require('./main');

// TODO: write your tests here
// Remember to use Stub, Mock, and Spy when necessary

const sinon = require('sinon');

test('Application selects unique people', async () => {
  const app = new Application();
  const people = ['Alice', 'Bob', 'Charlie'];
  sinon.stub(app, 'getNames').resolves([people, []]);

  const selected1 = await app.selectNextPerson();
  const selected2 = await app.selectNextPerson();
  const selected3 = await app.selectNextPerson();

  assert.notEqual(selected1, selected2);
  assert.notEqual(selected1, selected3);
  assert.notEqual(selected2, selected3);
});

test('Application notifies selected people', async () => {
  const app = new Application();
  const people = ['Alice'];
  sinon.stub(app, 'getNames').resolves([people, []]);
  sinon.stub(app.mailSystem, 'write').returns('Test context');
  sinon.spy(app.mailSystem, 'send');

  await app.selectNextPerson();
  await app.notifySelected();

  assert.strictEqual(app.mailSystem.send.callCount, 1);
  assert.strictEqual(app.mailSystem.send.args[0][0], 'Alice');
  assert.strictEqual(app.mailSystem.send.args[0][1], 'Test context');
});

// 測試 MailSystem 類
test('MailSystem writes mail content', () => {
  const mailSystem = new MailSystem();
  const context = mailSystem.write('John Doe');
  assert.strictEqual(context, 'Congrats, John Doe!');
});

test('MailSystem sends mail with success or failure', async () => {
  const mailSystem = new MailSystem();
  sinon.stub(console, 'log'); // console.log 输出

  await mailSystem.send('John Doe', 'Test context');
  assert(console.log.calledWith('--send mail to John Doe--'));
  assert(console.log.calledWith('mail sent')); // 或 mail failed
});
