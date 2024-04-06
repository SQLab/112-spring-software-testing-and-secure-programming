const { describe, it } = require('node:test');
const assert = require('assert');
const { Calculator } = require('./main');

// TODO: write your tests here
const { Calculator } = require('./calculator');
const assert = require('assert');
const parametrize = require('mocha-parametrize');

describe('Calculator Tests', () => {
    const calculator = new Calculator();

    describe('加法函數 (add)', () => {
        const errorTestData = [
            { input1: NaN, input2: 5, expectedError: Error },
            { input1: 'a', input2: 3, expectedError: Error },
            { input1: 10, input2: 'b', expectedError: Error }
        ];

        parametrize(errorTestData, ({ input1, input2, expectedError }) => {
            it(`輸入 ${input1} 和 ${input2} 時應拋出錯誤`, () => {
                assert.throws(() => calculator.add(input1, input2), expectedError);
            });
        });

        const nonErrorTestData = [
            { input1: 2, input2: 3, expected: 5 },
            { input1: 0, input2: 0, expected: 0 },
            { input1: -1, input2: 1, expected: 0 }
        ];

        parametrize(nonErrorTestData, ({ input1, input2, expected }) => {
            it(`輸入 ${input1} 和 ${input2} 時應返回 ${expected}`, () => {
                assert.strictEqual(calculator.add(input1, input2), expected);
            });
        });
    });

    describe('減法函數 (subtract)', () => {
        const errorTestData = [
            { input1: NaN, input2: 5, expectedError: Error },
            { input1: 'a', input2: 3, expectedError: Error },
            { input1: 10, input2: 'b', expectedError: Error }
        ];

        parametrize(errorTestData, ({ input1, input2, expectedError }) => {
            it(`輸入 ${input1} 和 ${input2} 時應拋出錯誤`, () => {
                assert.throws(() => calculator.subtract(input1, input2), expectedError);
            });
        });

        const nonErrorTestData = [
            { input1: 5, input2: 3, expected: 2 },
            { input1: 0, input2: 0, expected: 0 },
            { input1: 10, input2: -5, expected: 15 }
        ];

        parametrize(nonErrorTestData, ({ input1, input2, expected }) => {
            it(`should return ${expected} for inputs ${input1} and ${input2}`, () => {
                assert.strictEqual(calculator.subtract(input1, input2), expected);
            });
        });
    });
});