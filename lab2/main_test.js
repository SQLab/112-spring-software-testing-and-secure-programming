const { expect } = require('chai');
const sinon = require('sinon');
const fs = require('fs').promises;
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

        sinon.stub(Math, 'random').returns(0.6); // 假設成功
        let result = mailSystem.send(name, context);
        expect(result).to.be.true;

        Math.random.restore();

        sinon.stub(Math, 'random').returns(0.4); // 假設失敗
        result = mailSystem.send(name, context);
        expect(result).to.be.false;

        Math.random.restore();
    });
});

describe('Application', () => {
    beforeEach(async () => {
        sinon.stub(fs, 'readFile').resolves('Alice\nBob\nCharlie');
        this.app = new Application();
        await this.app.getNames();
    });

    afterEach(() => {
        fs.readFile.restore();
    });

    it('should initialize with people and selected lists', async () => {
        expect(this.app.people).to.deep.equal(['Alice', 'Bob', 'Charlie']);
        expect(this.app.selected).to.deep.equal([]);
    });

    it('should select a random person', () => {
        const person = this.app.selectNextPerson();
        expect(this.app.people).to.include(person);
        expect(this.app.selected).to.include(person);
    });

    it('should notify all selected people', () => {
        const mailSystemSpy = sinon.spy(this.app.mailSystem, 'send');

        this.app.selectNextPerson();
        this.app.selectNextPerson();
        this.app.notifySelected();

        expect(mailSystemSpy.calledTwice).to.be.true;
    });
});
