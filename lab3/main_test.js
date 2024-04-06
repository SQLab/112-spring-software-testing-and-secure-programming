const { describe, it } = require('node:test');
const assert = require('assert');
const { Calculator } = require('./main');

const parametrize = require('mocha-parametrize');

describe('Calculator Tests', () => {
    const calculator = new Calculator();

    describe('exp()', () => {
        // Error test cases
        const errorTestData = [
            { input: NaN, expectedError: Error },
            { input: 'a', expectedError: Error },
            { input: Number.MAX_VALUE, expectedError: Error }
        ];

        parametrize(errorTestData, ({ input, expectedError }) => {
            it(`should throw an error for input ${input}`, () => {
                assert.throws(() => calculator.exp(input), expectedError);
            });
        });

        // Non-error test cases
        const nonErrorTestData = [
            { input: 0, expected: 1 },
            { input: 1, expected: Math.exp(1) },
            { input: -1, expected: Math.exp(-1) },
            { input: 2, expected: Math.exp(2) }
        ];

        parametrize(nonErrorTestData, ({ input, expected }) => {
            it(`should return ${expected} for input ${input}`, () => {
                assert.strictEqual(calculator.exp(input), expected);
            });
        });
    });

    describe('log()', () => {
        // Error test cases
        const errorTestData = [
            { input: NaN, expectedError: Error },
            { input: 'a', expectedError: Error },
            { input: 0, expectedError: Error },
            { input: -1, expectedError: Error }
        ];

        parametrize(errorTestData, ({ input, expectedError }) => {
            it(`should throw an error for input ${input}`, () => {
                assert.throws(() => calculator.log(input), expectedError);
            });
        });

        // Non-error test cases
        const nonErrorTestData = [
            { input: 1, expected: 0 },
            { input: Math.E, expected: 1 },
            { input: 10, expected: Math.log(10) },
            { input: 100, expected: Math.log(100) }
        ];

        parametrize(nonErrorTestData, ({ input, expected }) => {
            it(`should return ${expected} for input ${input}`, () => {
                assert.strictEqual(calculator.log(input), expected);
            });
        });
    });
});