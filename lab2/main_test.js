const test = require('node:test');
const assert = require('assert');
const sinon = require('sinon');
const mock_fs = require('mock-fs');
const { Application, MailSystem } = require('./main');

test('should return a message context', () => {
    const mailSystem = new MailSystem();
    const name = 'John';
    const consoleStub = sinon.stub(console, 'log');
    const context = mailSystem.write(name);
    assert(consoleStub.calledWith('--write mail for John--'));
    assert.strictEqual(context, 'Congrats, John!');

    sinon.restore();
  });

test('should return true if mail is sent successfully', (t) => {
    const mailSystem = new MailSystem();
    const name = 'John';


    // test send mail success return true
    const consoleStub_success = sinon.stub(console, 'log');
	t.mock.method(Math,'random', () => 1);
    is_send = mailSystem.send('Joy', "test mail");
    assert(consoleStub_success.calledWith('mail sent'));
    assert.strictEqual(is_send, true);
    consoleStub_success.restore();

    // test send mail fail return false
    const consoleStub_fail = sinon.stub(console, 'log');
	t.mock.method(Math,'random', () => 0.4);
    is_send = mailSystem.send('Joy', "test mail");
    assert(consoleStub_fail.calledWith('mail failed'));
    assert.strictEqual(is_send, false);
    consoleStub_fail.restore();


  });
 


test('should return name_list ', async()=>{
    const mockNameList = 'Alice\nBob\nCharlie';
    mock_fs({
      'name_list.txt': mockNameList
    });
    const app = new Application();
    const [people, selected] = await app.getNames(); // Ensure that names are populated

    assert.deepStrictEqual(people, ['Alice', 'Bob', 'Charlie']);
    assert.deepStrictEqual(selected, []);
});

    
test('should return null if all people are selected', async (t) => {
    const app = new Application();
    app.people = ['Alice', 'Bob', 'Charlie'];
    app.selected = ['Alice', 'Bob', 'Charlie'];
    
    const result = app.selectNextPerson();
    assert.strictEqual(result, null);
  });

  //Test case for getRandomPerson() method
test('should return a random person', () => {
    // Stub Math.random() to return a fixed value
    const mathRandomStub = sinon.stub(Math, 'random').returns(0.5);

    // Create an instance of the Application class
    const app = new Application();
    app.people = ['Alice', 'Bob', 'Charlie'];
    // Call the getRandomPerson() method
    const randomPerson = app.getRandomPerson();

    // Ensure that the random person is one of the people in the list
    assert(app.people.includes(randomPerson));

    // Restore the stubbed Math.random() function
    mathRandomStub.restore();
});

test('should select and return a person who has not been selected yet', () => {
    const app = new Application();
    app.people = ['Alice', 'Bob', 'Charlie'];

    const mathRandomStub = sinon.stub(Math, 'random').returns(0.5);

    const result = app.selectNextPerson();

    assert.ok(app.people.includes(result));
    assert.ok(app.selected.includes(result));

    mathRandomStub.restore();
  });

test('should call write and send methods of MailSystem for each selected person', () => {
    const mailSystem = new MailSystem();
    const writeStub = sinon.stub(mailSystem, 'write').returns('Message context');
    const sendStub = sinon.stub(mailSystem, 'send').returns(true);

    const app = new Application();
    app.mailSystem = mailSystem;
    app.selected = ['Alice', 'Bob', 'Charlie'];

    app.notifySelected();

    assert.strictEqual(writeStub.callCount, 3);
    assert.strictEqual(sendStub.callCount, 3);

    writeStub.restore();
    sendStub.restore();
  });
