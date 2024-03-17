const test = require('node:test');
const assert = require('assert');

const { Application, MailSystem } = require('./main');

test('should return a message context', () => {
    const mailSystem = new MailSystem();
    const name = 'John';

    const context = mailSystem.write(name);
    assert.strictEqual(context, 'Congrats, John!');

  });

test('should return true if mail is sent successfully', (t) => {
    const mailSystem = new MailSystem();
    const name = 'John';

    // test send mail success return true
	t.mock.method(Math,'random', () => 1);
    is_send = mailSystem.send('Joy', "test mail");
    assert.strictEqual(is_send, true);
 

    // test send mail fail return false
	t.mock.method(Math,'random', () => 0.4);
    is_send = mailSystem.send('Joy', "test mail");
    assert.strictEqual(is_send, false);

  });
 


test('should return name_list ', async()=>{

    const app = new Application();
    const [people, selected] = await app.getNames(); // Provide the path to the temporary file

    // Assert that the returned list matches the expected list
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
    Math.random = () => 0.5; // Set Math.random() to always return 0.5
    const randomNumber = Math.random();

    // Create an instance of the Application class
    const app = new Application();
    app.people = ['Alice', 'Bob', 'Charlie'];
    // Call the getRandomPerson() method
    const randomPerson = app.getRandomPerson();

    // Ensure that the random person is one of the people in the list
    assert(app.people.includes(randomPerson));

});

test('should select and return a person who has not been selected yet', () => {
    const app = new Application();
    app.people = ['Alice', 'Bob', 'Charlie'];

    let getRandomPersonCallCount = 0;
    app.getRandomPerson = () => {
        switch (getRandomPersonCallCount++) {
            case 0:
                return 'Alice';
            case 1:
                return 'Bob';
            case 2:
                return 'Charlie';
        }
    };

    app.selected = ['Alice', 'Bob'];

    const result = app.selectNextPerson();

    assert.strictEqual(result, 'Charlie'); 
    assert.strictEqual(getRandomPersonCallCount, 3); 
});

class MockMailSystem {
    constructor() {
        this.writeCallCount = 0;
        this.sendCallCount = 0;
    }

    write() {
        this.writeCallCount++;
        return 'Message context';
    }

    send() {
        this.sendCallCount++;
        return true;
    }
}

test('should call write and send methods of MailSystem for each selected person', () => {
    const mailSystem = new MockMailSystem();

    const app = new Application();
    app.mailSystem = mailSystem;
    app.selected = ['Alice', 'Bob', 'Charlie'];

    app.notifySelected();

    assert.strictEqual(mailSystem.writeCallCount, 3);
    assert.strictEqual(mailSystem.sendCallCount, 3);
});
