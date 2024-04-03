const test = require('node:test');
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { Application, MailSystem } = require('./main');


/* Mock Object */
function createMockFn(originalFn) {
    const mockFn = function(...args) {
        mockFn.calls.push(args); 
        return originalFn.apply(this, args);
    };
    mockFn.calls = []; 
    return mockFn;
}

/* Test Stub */
const tempNameListPath = path.join(__dirname, 'name_list.txt');

async function setup() {
    fs.writeFileSync(tempNameListPath, 'Apple\nBanana\nCat');
}

async function teardown() {
    fs.unlinkSync(tempNameListPath);
}


/* Test Spy */
test('MailSystem.write should return correct context', async (t) => {
    const mailSystem = new MailSystem();
    assert.strictEqual(mailSystem.write('Apple'), 'Congrats, Apple!');
    assert.strictEqual(mailSystem.write(null), 'Congrats, null!', 'Should handle null');
    assert.strictEqual(mailSystem.write(123), 'Congrats, 123!', 'Should handle numbers');
});


test('MailSystem.send should handle both success and failure', async (t) => {
    const mailSystem = new MailSystem();
    let originalRandom = Math.random; 
    Math.random = () => 0.9; 
    assert.strictEqual(mailSystem.send('Apple', 'Congrats, Apple!'), true, 'Should send successfully');
    Math.random = () => 0.1; 
    assert.strictEqual(mailSystem.send('Banana', 'Sorry, Banana!'), false, 'Should fail to send');
    Math.random = originalRandom; 
});


test('Application should initialize and function correctly', async (t) => {
    await setup();

    const app = new Application(tempNameListPath);
    await new Promise(resolve => setTimeout(resolve, 1000)); 
    assert.strictEqual(app.people.length, 3, 'Should load 3 people');

    const selectedFirst = app.selectNextPerson();
    assert.ok(app.selected.includes(selectedFirst), 'Selected person should be in selected array');

    const selectedSecond = app.selectNextPerson();
    assert.ok(app.selected.includes(selectedSecond), 'Second selected person should be in selected array');
    assert.notStrictEqual(selectedFirst, selectedSecond, 'Should select different people');

    app.mailSystem.write = createMockFn(app.mailSystem.write);
    app.mailSystem.send = createMockFn(app.mailSystem.send);
    app.notifySelected();
    assert.strictEqual(app.mailSystem.write.calls.length, 2, 'write should be called for each selected person');
    assert.strictEqual(app.mailSystem.send.calls.length, 2, 'send should be called for each selected person');

    await teardown();
});


test('Application should return null when all are selected', async (t) => {
    await setup();

    const app = new Application(tempNameListPath);
    await new Promise(resolve => setTimeout(resolve, 1000)); 

   
    app.selectNextPerson();
    app.selectNextPerson();
    app.selectNextPerson(); 
    const result = app.selectNextPerson();
    assert.strictEqual(result, null, 'Should return null when all are selected');

    await teardown();
});

