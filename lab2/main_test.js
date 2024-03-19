const test = require('node:test');
const assert = require('assert');
const { Application, MailSystem } = require('./main');
const { send } = require('process');
const fs = require('fs');

// TODO: write your tests here
// Remember to use Stub, Mock, and Spy when necessary

test('MailSystem write', (t) => {
    const MSw = new MailSystem();
    const MSwName = 'Eric';

    context = MSw.write(MSwName);
    assert.strictEqual(context, 'Congrats, Eric!', 'Error Name');

    context = MSw.write(null);
    assert.strictEqual(context, 'Congrats, null!', 'Error null');

    context = MSw.write(111);
    assert.strictEqual(context, 'Congrats, 111!', 'Error 111');

})


test('MailSystem send', (t) => {
    const MSs = new MailSystem();
    const MSsName = 'Eric';

    t.mock.method(Math, 'random', () => 1);
    sendmail = MSs.send(MSsName, 'mail context');
    assert.strictEqual(sendmail, true, 'random => 1 should be send');

    t.mock.method(Math, 'random', () => 0.2);
    sendmail = MSs.send(MSsName, 'mail context');
    assert.strictEqual(sendmail, false, 'random => 0.2 shouldn\'t be send');

})



test("Application getNames()", async (t) => {
    const nameList = ['A', 'B', 'C'];
    fs.writeFileSync('name_list.txt', 'A\nB\nC', 'utf8');
    const app = new Application();
    getNameList = await app.getNames();
    assert.deepStrictEqual(getNameList, [nameList, []]);
});


test("Application getRandomPerson()", async (t) => {
    const app = new Application();
    const names = await app.getNames();

    t.mock.method(Math, 'random', () => 0);
    assert.strictEqual(app.getRandomPerson(), 'A');
    t.mock.method(Math, 'random', () => 0.4);
    assert.strictEqual(app.getRandomPerson(), 'B');
    t.mock.method(Math, 'random', () => 0.7);
    assert.strictEqual(app.getRandomPerson(), 'C');
});

test("Application selectNextPerson()", async (t) => {
    const app = new Application();
    const person = await app.getNames();

    //Simulate getRandomPerson()
    app.selected = ['A'];
    let cnt = 0;
    t.mock.method(app, 'getRandomPerson', () => {
        if (cnt <= person.length) {
            return person[0][cnt++];
        }
    });

    assert.strictEqual(app.selected.length, 1);

    assert.strictEqual(app.selectNextPerson(), 'B');
    assert.deepStrictEqual(app.selected, ['A', 'B']);
    assert.strictEqual(app.selected.length, 2);

    assert.strictEqual(app.selectNextPerson(), 'C');
    assert.deepStrictEqual(app.selected, ['A', 'B', 'C']);

    // all selected
    assert.strictEqual(app.selectNextPerson(), null);
});

test("Application notifySelected()", async (t) => {
    const app = new Application();
    app.selected = ['A', 'B', 'C'];
    app.mailSystem.send = test.mock.fn(app.mailSystem.send);
    app.mailSystem.write = test.mock.fn(app.mailSystem.write);
    app.notifySelected();

    assert.strictEqual(app.mailSystem.send.mock.calls.length, 3);
    assert.strictEqual(app.mailSystem.write.mock.calls.length, 3);
});