const { describe, it } = require('node:test');
const assert = require('assert');
const { Calculator } = require('./main');

describe('Calculator', () => {
    const calculator = new Calculator();

    describe('exp method', () => {
        it('should return 1 for exp(0)', () => {
            assert.strictEqual(calculator.exp(0), Math.exp(0));
        });

        it('should return 2.718281828459045 for exp(1)', () => {
            assert.strictEqual(calculator.exp(1), Math.exp(1));
        });

        it('should return 7.38905609893065 for exp(2)', () => {
            assert.strictEqual(calculator.exp(2), Math.exp(2));
        });

        it('should throw an error for unsupported operand type with exp("a")', () => {
            assert.throws(() => calculator.exp('a'), /unsupported operand type/);
        });

        it('should throw an error for overflow with exp(1000)', () => {
            assert.throws(() => calculator.exp(1000), /overflow/);
        });

        it('should handle large values near overflow with exp(709)', () => {
            assert.doesNotThrow(() => calculator.exp(709));
        });

        it('should calculate exp for large values without overflow with exp(700)', () => {
            assert.doesNotThrow(() => calculator.exp(700));
        });
    });

    describe('log method', () => {
        it('should return 0 for log(1)', () => {
            assert.strictEqual(calculator.log(1), Math.log(1));
        });

        it('should return 1 for log(2.718281828459045)', () => {
            assert.strictEqual(calculator.log(Math.E), Math.log(Math.E));
        });

        it('should return 2 for log(7.3890560989306495)', () => {
            assert.strictEqual(calculator.log(Math.E * Math.E), Math.log(Math.E * Math.E));
        });

        it('should throw an error for math domain error with log(-1)', () => {
            assert.throws(() => calculator.log(-1), /math domain error/);
        });

        it('should throw an error for math domain error with log(0)', () => {
            assert.throws(() => calculator.log(0), /math domain error/);
        });

        it('should calculate log for small positive values close to zero with log(1e-10)', () => {
            const result = calculator.log(1e-10);
            assert(!isNaN(result) && result < 0);
        });

        it('should throw an error for unsupported operand type with log(Infinity)', () => {
            assert.throws(() => calculator.log(Infinity), /unsupported operand type/);
        });
    });
});

