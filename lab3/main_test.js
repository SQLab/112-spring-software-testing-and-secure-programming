const { describe, it } = require('node:test');
const assert = require('assert');
const { Calculator } = require('./main');

describe('Calculator', () => {
    describe('exp', () => {
        it('should calculate the exponential function correctly', () => {
            const calculator = new Calculator();
            assert.strictEqual(calculator.exp(0), 1);
            assert.strictEqual(calculator.exp(1), Math.exp(1));
            assert.strictEqual(calculator.exp(2), Math.exp(2));
        });

        it('should throw an error for unsupported operand type', () => {
            const calculator = new Calculator();
            assert.throws(() => calculator.exp(NaN), {
                name: 'Error',
                message: 'unsupported operand type'
            });
            assert.throws(() => calculator.exp(Infinity), {
                name: 'Error',
                message: 'unsupported operand type'
            });
        });

        it('should throw an error for overflow', () => {
            const calculator = new Calculator();
            assert.throws(() => calculator.exp(1000), {
                name: 'Error',
                message: 'overflow'
            });
        });
    });

    describe('log', () => {

        it('should calculate the natural logarithm correctly', () => {
            const calculator = new Calculator();
            assert.strictEqual(calculator.log(1), 0);
            assert.strictEqual(calculator.log(Math.E), 1);
        });

        it('should throw an error for unsupported operand type', () => {
            const calculator = new Calculator();
            assert.throws(() => calculator.log(NaN), {
                name: 'Error',
                message: 'unsupported operand type'
            });
            assert.throws(() => calculator.log(Infinity), {
                name: 'Error',
                message: 'unsupported operand type'
            });
        });

        it('should throw an error for math domain error (1)', () => {
            const calculator = new Calculator();
            assert.throws(() => calculator.log(0), {
                name: 'Error',
                message: 'math domain error (1)'
            });
        });

        it('should throw an error for math domain error (2)', () => {
            const calculator = new Calculator();
            assert.throws(() => calculator.log(-1), {
                name: 'Error',
                message: 'math domain error (2)'
            });
        });
    });
});
