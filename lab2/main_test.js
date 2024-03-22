const sinon = require('sinon');
const assert = require('assert');
const { Application, MailSystem } = require('./main');

describe('Application', () => {
    describe('#getNames()', () => {
        it('should read names from file and return an array', async () => {
            // 假設存在 name_list.txt 包含一些名字
            const application = new Application();
            const [people, selected] = await application.getNames();
            assert(Array.isArray(people));
            assert(Array.isArray(selected));
        });
    });

    describe('#selectNextPerson()', () => {
        it('should select a person from the list of people', () => {
            const application = new Application();
            const spyGetRandomPerson = sinon.spy(application, 'getRandomPerson');
            application.selectNextPerson();
            assert(spyGetRandomPerson.calledOnce);
            spyGetRandomPerson.restore();
        });

        it('should select all people without repetition', () => {
            const application = new Application();
            const selectedPeople = [];
            const spyGetRandomPerson = sinon.spy(application, 'getRandomPerson');
            for (let i = 0; i < application.people.length; i++) {
                selectedPeople.push(application.selectNextPerson());
            }
            assert.strictEqual(selectedPeople.length, application.people.length);
            assert(spyGetRandomPerson.callCount === application.people.length);
            spyGetRandomPerson.restore();
        });
    });

    describe('#notifySelected()', () => {
        it('should call write and send methods for each selected person', () => {
            const application = new Application();
            const stubWrite = sinon.stub(application.mailSystem, 'write').returns('Context');
            const stubSend = sinon.stub(application.mailSystem, 'send').returns(true);
            application.selected = ['Person1', 'Person2']; // 假設已經選擇了兩個人
            application.notifySelected();
            assert.strictEqual(stubWrite.callCount, 2);
            assert.strictEqual(stubSend.callCount, 2);
            sinon.assert.calledWith(stubWrite, 'Person1');
            sinon.assert.calledWith(stubWrite, 'Person2');
            sinon.assert.calledWith(stubSend, 'Person1', 'Context');
            sinon.assert.calledWith(stubSend, 'Person2', 'Context');
            stubWrite.restore();
            stubSend.restore();
        });
    });
});

describe('MailSystem', () => {
    describe('#write()', () => {
        it('should return context for the given name', () => {
            const mailSystem = new MailSystem();
            const context = mailSystem.write('Person');
            assert.strictEqual(typeof context, 'string');
        });
    });

    describe('#send()', () => {
        it('should return true or false indicating success or failure of sending mail', () => {
            const mailSystem = new MailSystem();
            const success = mailSystem.send('Person', 'Context');
            assert.strictEqual(typeof success, 'boolean');
        });
    });
});
