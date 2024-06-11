const { describe, it } = require('node:test');
const assert = require('assert');
const { Calculator } = require('./main');


describe('Calculator', () => {
    const calculator = new Calculator();

    describe('exp function', () => {
        it('calculates the exponential of a number', async () => {
            assert.strictEqual(calculator.exp(1), Math.exp(1));
        });

        it('throws error on non-finite input', async () => {
            assert.throws(() => calculator.exp('a'), {
                name: 'Error',
                message: 'unsupported operand type'
            });
            assert.throws(() => calculator.exp(Infinity), {
                name: 'Error',
                message: 'unsupported operand type'
            });
        });

        it('handles overflow', async () => {
            assert.throws(() => calculator.exp(1000), {
                name: 'Error',
                message: 'overflow'
            });
        });
    });

    describe('log function', () => {
        it('calculates the logarithm of a number', async () => {
            assert.strictEqual(calculator.log(Math.E), Math.log(Math.E));
        });

        it('throws error on non-finite input', async () => {
            assert.throws(() => calculator.log('a'), {
                name: 'Error',
                message: 'unsupported operand type'
            });
            assert.throws(() => calculator.log(-1), {
                name: 'Error',
                message: 'math domain error (1)'
            });
        });

        it('handles domain errors', async () => {
            assert.throws(() => calculator.log(0), {
                name: 'Error',
                message: 'math domain error (1)'
            });
            assert.throws(() => calculator.log(null), {
                name: 'Error',
                message: 'unsupported operand type'
            });
        });
    });
});


// TODO: write your tests here
