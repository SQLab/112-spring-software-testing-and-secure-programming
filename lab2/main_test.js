const testFramework = require('node:test');
const assertFramework = require('assert');
const fileSystem = require('fs');
testFramework.mock.method(fileSystem, 'readFile', (filePath, readOptions, readCallback) => {
    readCallback(null, 'charlie\ndelta\necho');
});
const { SystemApp, PostSystem } = require('./main');

testFramework('Test PostSystem : compose()', () => {
    const ps = new PostSystem();
    assertFramework.strictEqual(ps.compose('charlie'), 'Congrats, charlie!');
    assertFramework.strictEqual(ps.compose(null), 'Congrats, null!');
    assertFramework.strictEqual(ps.compose(48763), 'Congrats, 48763!');
});

testFramework('Test PostSystem : dispatch()', () => {
    const ps = new PostSystem();
    const personName = 'charlie';
    testFramework.mock.method(Math, 'random', () => 0.6);
    assertFramework.strictEqual(ps.dispatch(personName, 'success'), true);
    testFramework.mock.method(Math, 'random', () => 0.4);
    assertFramework.strictEqual(ps.dispatch(personName, 'fail'), false);
});

testFramework('Test SystemApp : listNames()', async () => {
    const sysApp = new SystemApp();
    const personList = ['charlie', 'delta', 'echo'];
    const resultNames = await sysApp.listNames();
    assertFramework.deepStrictEqual(resultNames, [personList, []])
});

testFramework('Test SystemApp : chooseRandomIndividual()', async (testFramework) => {
    const sysApp = new SystemApp();
    const resultNames = await sysApp.listNames();
    testFramework.mock.method(Math, 'random', () => 0);
    assertFramework.strictEqual(sysApp.chooseRandomIndividual(), 'charlie');
    testFramework.mock.method(Math, 'random', () => 0.4);
    assertFramework.strictEqual(sysApp.chooseRandomIndividual(), 'delta');
    testFramework.mock.method(Math, 'random', () => 0.7);
    assertFramework.strictEqual(sysApp.chooseRandomIndividual(), 'echo');
});

testFramework('Test SystemApp : pickNextIndividual()', async (testFramework) => {
    const sysApp = new SystemApp();
    const resultNames = await sysApp.listNames();
    sysApp.chosen = ['charlie'];
    let count = 0;
    testFramework.mock.method(sysApp, 'chooseRandomIndividual', () => {
        if (count <= resultNames.length) { 
            return resultNames[0][count++]; 
        }
    });
    assertFramework.strictEqual(sysApp.pickNextIndividual(), 'delta');
    assertFramework.deepStrictEqual(sysApp.chosen, ['charlie', 'delta']);
    assertFramework.strictEqual(sysApp.pickNextIndividual(), 'echo');
    assertFramework.deepStrictEqual(sysApp.chosen, ['charlie', 'delta', 'echo']);
    assertFramework.strictEqual(sysApp.pickNextIndividual(), null);
});

testFramework('Test SystemApp : alertChosen()', async (testFramework) => {
    const sysApp = new SystemApp();
    sysApp.individuals = ['charlie', 'delta', 'echo'];
    sysApp.chosen = ['charlie', 'delta', 'echo'];
    sysApp.postSystem.dispatch = testFramework.mock.fn(sysApp.postSystem.dispatch);
    sysApp.postSystem.compose = testFramework.mock.fn(sysApp.postSystem.compose);
    sysApp.alertChosen();
    assertFramework.strictEqual(sysApp.postSystem.dispatch.mock.calls.length, 3);
    assertFramework.strictEqual(sysApp.postSystem.compose.mock.calls.length, 3);
});
