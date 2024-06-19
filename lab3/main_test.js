const { describe, it } = require('node:test');
const assert = require('assert');
const { Calculator } = require('./main');

describe('Calculator', () => {
    describe('exp', () => {
        it('should return the exponential value of a number', () => {
            const calculator = new Calculator();
            assert.strictEqual(calculator.exp(0), 1);
            assert.strictEqual(calculator.exp(1), Math.exp(1));
            assert.strictEqual(calculator.exp(2), Math.exp(2));
        });

        it('should throw error for unsupported operand type', () => {
            const calculator = new Calculator();
            assert.throws(() => calculator.exp('abc'), Error);
            assert.throws(() => calculator.exp(null), Error);
        });

        it('should throw error for overflow', () => {
            const calculator = new Calculator();
            assert.throws(() => calculator.exp(1000), Error);
        });
    });

    describe('log', () => {
        it('should return the natural logarithm of a number', () => {
            const calculator = new Calculator();
            assert.strictEqual(calculator.log(1), 0);
            assert.strictEqual(calculator.log(Math.exp(1)), 1);
            assert.strictEqual(calculator.log(10), Math.log(10));
        });

        it('should throw error for unsupported operand type', () => {
            const calculator = new Calculator();
            assert.throws(() => calculator.log('abc'), Error);
            assert.throws(() => calculator.log(null), Error);
            assert.throws(() => calculator.log(-1), Error);
        });

        it('should throw error for math domain errors', () => {
            const calculator = new Calculator();
            assert.throws(() => calculator.log(0), Error);
            assert.throws(() => calculator.log(-100), Error);
        });
    });
});

