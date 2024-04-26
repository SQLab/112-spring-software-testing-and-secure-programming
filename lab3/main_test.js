const { describe, it } = require('node:test');
const assert = require('assert');
const { Calculator } = require('./main');

describe('Calculator', () => {
    const calculator = new Calculator();

    describe('exp()', () => {
        // Test cases for error results
        it('should throw error for unsupported operand type', () => {
            assert.throws(() => calculator.exp('string'), { message: 'unsupported operand type' });
        });

        it('should throw error for overflow', () => {
            assert.throws(() => calculator.exp(1000), { message: 'overflow' });
        });

        // Parameterized test cases for non-error results
        const nonErrorCases = [
            { input: 0, expected: 1 },
            { input: 1, expected: Math.exp(1) },
            { input: -1, expected: Math.exp(-1) }
        ];

        nonErrorCases.forEach(({ input, expected }) => {
            it(`should return ${expected} for exp(${input})`, () => {
                assert.strictEqual(calculator.exp(input), expected);
            });
        });
    });

    describe('log()', () => {
        // Test cases for error results
        it('should throw error for unsupported operand type', () => {
            assert.throws(() => calculator.log('string'), { message: 'unsupported operand type' });
        });

        it('should throw error for math domain error (1)', () => {
            assert.throws(() => calculator.log(0), { message: 'math domain error (1)' });
        });

        it('should throw error for math domain error (2)', () => {
            assert.throws(() => calculator.log(-1), { message: 'math domain error (2)' });
        });

        // Parameterized test cases for non-error results
        const nonErrorCases = [
            { input: 1, expected: 0 },
            { input: Math.E, expected: 1 },
            { input: 10, expected: Math.log(10) }
        ];

        nonErrorCases.forEach(({ input, expected }) => {
            it(`should return ${expected} for log(${input})`, () => {
                assert.strictEqual(calculator.log(input), expected);
            });
        });
    });
});
