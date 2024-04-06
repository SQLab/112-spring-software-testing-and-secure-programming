const { describe, it } = require('node:test');
const assert = require('assert');
const { Calculator } = require('./main');

// TODO: write your tests here
const { Calculator } = require('./calculator');
const assert = require('assert');
const parametrize = require('mocha-parametrize');

describe('Calculator functionality tests', () => {
    const calculator = new Calculator();

    describe('Exponential function (exp)', () => {
        const errorTestData = [
            { input: NaN, expectedError: Error },
            { input: 'a', expectedError: Error },
            { input: Number.MAX_VALUE, expectedError: Error }
        ];

        parametrize(errorTestData, ({ input, expectedError }) => {
            it(`當輸入為 ${input} 時應拋出錯誤`, () => {
                assert.throws(() => calculator.exp(input), expectedError);
            });
        });

        const nonErrorTestData = [
            { input: 0, expected: 1 },
            { input: 1, expected: Math.exp(1) },
            { input: 2, expected: Math.exp(2) }
        ];

        parametrize(nonErrorTestData, ({ input, expected }) => {
            it(`計算 ${input} 的指數值應該為 ${expected}}`, () => {
                assert.strictEqual(calculator.exp(input), expected);
            });
        });
    });

    describe('Logarithmic function (log)', () => {
        const errorTestData = [
            { input: NaN, expectedError: Error },
            { input: 'a', expectedError: Error },
            { input: 0, expectedError: Error },
            { input: -1, expectedError: Error }
        ];

        parametrize(errorTestData, ({ input, expectedError }) => {
            it(`當輸入為 ${input} 時應拋出錯誤`, () => {
                assert.throws(() => calculator.log(input), expectedError);
            });
        });

        const nonErrorTestData = [
            { input: 1, expected: 0 },
            { input: Math.E, expected: 1 },
            { input: 10, expected: Math.log(10) }
        ];

        parametrize(nonErrorTestData, ({ input, expected }) => {
            it(`計算 ${input} 的自然對數應該為 ${expected}`, () => {
                assert.strictEqual(calculator.log(input), expected);
            });
        });
    });
});