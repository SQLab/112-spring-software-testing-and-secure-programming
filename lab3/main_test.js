const { describe, it } = require('node:test');
const assert = require('assert');
const { Calculator } = require('./main');

describe('Calculator', () => {
    describe('exp', () => {
        it('should calculate the exponential of a number', () => {
            const calculator = new Calculator();
            const result = calculator.exp(2);
            assert.strictEqual(result, Math.exp(2));
        });

        it('should throw an error for non-finite input', () => {
            const calculator = new Calculator();
            assert.throws(() => {
                calculator.exp('abc');
            }, /unsupported operand type/);
        });

        it('should throw an error for overflow', () => {
            const calculator = new Calculator();
            assert.throws(() => {
                calculator.exp(1000);
            }, /overflow/);
        });
    });

    describe('log', () => {
        it('should calculate the logarithm of a positive number', () => {
            const calculator = new Calculator();
            const result = calculator.log(10);
            assert.strictEqual(result, Math.log(10));
        });

        it('should throw an error for non-finite input', () => {
            const calculator = new Calculator();
            assert.throws(() => {
                calculator.log('abc');
            }, /unsupported operand type/);
        });

        it('should throw an error for negative input', () => {
            const calculator = new Calculator();
            assert.throws(() => {
                calculator.log(-1);
            }, /math domain error \(1\)/);
        });

        it('should throw an error for input of zero', () => {
            const calculator = new Calculator();
            assert.throws(() => {
                calculator.log(0);
            }, /math domain error \(2\)/);
        });
    });
});
