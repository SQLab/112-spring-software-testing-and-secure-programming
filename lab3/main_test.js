const assert = require('assert');
const { Calculator } = require('./main');

// TODO: write your tests here

describe('Calculator', () => {

    describe('exp', () => {
        it('should calculate correctly for 0, 1, and -1', () => {
            const calculator = new Calculator();     
            assert.strictEqual(calculator.exp(0), 1);
            assert.strictEqual(calculator.exp(1), Math.exp(1));
            assert.strictEqual(calculator.exp(-1), 1 / Math.exp(1));
        });

        it('should throw an error for NaN, Infinity, and -Infinity', () => {
            const calculator = new Calculator();
            assert.throws(() => calculator.exp(NaN), Error);
            assert.throws(() => calculator.exp(Infinity), Error);
            assert.throws(() => calculator.exp(-Infinity), Error);
        });

        it('should throw an error for overflow', () => {
            const calculator = new Calculator();
            assert.throws(() => calculator.exp(9999), Error);
        });
    });

    describe('log', () => {
        it('should calculate correctly for 1 and Math.E', () => {
            const calculator = new Calculator();
            assert.strictEqual(calculator.log(1), 0);
            assert.strictEqual(calculator.log(Math.E), 1);
        });

        it('should throw an error for NaN, Infinity, and -Infinity', () => {
            const calculator = new Calculator();
            assert.throws(() => calculator.log(NaN), Error);
            assert.throws(() => calculator.log(Infinity), Error);
            assert.throws(() => calculator.log(-Infinity), Error);
        });

        it('should throw an error for 0 and -1', () => {
            const calculator = new Calculator();
            assert.throws(() => calculator.log(0), Error);
            assert.throws(() => calculator.log(-1), Error);
        });
    });
});
