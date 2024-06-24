const { expect } = require('chai');
const sinon = require('sinon');
const fs = require('fs');
const { MailSystem, Application } = require('./main_test');

describe('MailSystem', () => {
    it('should write the correct mail content', () => {
        const mailSystem = new MailSystem();
        const name = 'Alice';
        const content = mailSystem.write(name);
        expect(content).to.equal('Congrats, Alice!');
    });

    it('should send mail with random success or failure', () => {
        const mailSystem = new MailSystem();
        const name = 'Alice';
        const context = mailSystem.write(name);

        sinon.stub(Math, 'random').returns(0.6); 
        let result = mailSystem.send(name, context);
        expect(result).to.be.true;

        Math.random.restore();

        sinon.stub(Math, 'random').returns(0.4); 
        result = mailSystem.send(name, context);
        expect(result).to.be.false;

        Math.random.restore();
    });
});

describe('Application', () => {
    beforeEach(() => {
        sinon.stub(fs, 'readFile').resolves('Alice\nBob\nCharlie');
    });

    afterEach(() => {
        fs.readFile.restore();
    });

    it('should initialize with people and selected lists', async () => {
        const app = new Application();
        await app.getNames();
        expect(app.people).to.deep.equal(['Alice', 'Bob', 'Charlie']);
        expect(app.selected).to.deep.equal([]);
    });

    it('should select a random person', async () => {
        const app = new Application();
        await app.getNames();
        const person = app.selectNextPerson();
        expect(app.people).to.include(person);
        expect(app.selected).to.include(person);
    });

    it('should notify all selected people', async () => {
        const app = new Application();
        await app.getNames();
        const mailSystemSpy = sinon.spy(app.mailSystem, 'send');

        app.selectNextPerson();
        app.selectNextPerson();
        app.notifySelected();

        expect(mailSystemSpy.calledTwice).to.be.true;
    });
});
