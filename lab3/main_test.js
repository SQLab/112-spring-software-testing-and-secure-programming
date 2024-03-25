const { describe, it } = require('node:test');
const assert = require('assert');
const { Calculator } = require('./main');

describe('Calculator', () => {
    describe('exp', () => {
        const calculator = new Calculator();

        // Test cases for error results
        it('should throw error for unsupported operand type', () => {
            assert.throws(() => calculator.exp(NaN), /unsupported operand type/);
            assert.throws(() => calculator.exp(Infinity), /unsupported operand type/);
        });

        // Parameterized test cases for non-error results
        const nonErrorTestCases = [
            { input: 0, expected: 1 },
            { input: 1, expected: Math.exp(1) },
            { input: -1, expected: Math.exp(-1) },
            { input: 2, expected: Math.exp(2) }, // Add more cases
            { input: -2, expected: Math.exp(-2) },
            { input: 0.5, expected: Math.exp(0.5) }
        ];
        nonErrorTestCases.forEach(({ input, expected }) => {
            it(`should return ${expected} for input ${input}`, () => {
                assert.strictEqual(calculator.exp(input), expected);
            });
        });
    });

    describe('log', () => {
        const calculator = new Calculator();

        // Test cases for error results
        it('should throw error for unsupported operand type', () => {
            assert.throws(() => calculator.log(NaN), /unsupported operand type/);
            assert.throws(() => calculator.log(0), /unsupported operand type/);
            assert.throws(() => calculator.log(-1), /unsupported operand type/);
        });

        // Parameterized test cases for non-error results
        const nonErrorTestCases = [
            { input: 1, expected: 0 },
            { input: Math.E, expected: 1 },
            { input: Math.pow(Math.E, 2), expected: 2 },
            { input: 10, expected: Math.log(10) }, // Add more cases
            { input: 100, expected: Math.log(100) },
            { input: 0.1, expected: Math.log(0.1) }
        ];
        nonErrorTestCases.forEach(({ input, expected }) => {
            it(`should return ${expected} for input ${input}`, () => {
                assert.strictEqual(calculator.log(input), expected);
            });
        });
    });
});
