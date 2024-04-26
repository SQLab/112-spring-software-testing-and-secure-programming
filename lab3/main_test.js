const { describe, it } = require('node:test');
const assert = require('assert');
const { Calculator } = require('./main');

describe('Calculator', function() {
    describe('exp()', function() {
        // 參數化測試案例
        const testCases = [
            { input: 2, expected: Math.exp(2) },
            { input: 1, expected: Math.exp(1) },
            { input: 0, expected: Math.exp(0) },
        ];
        testCases.forEach((testCase) => {
            it(`should return correct value for input ${testCase.input}`, function() {
                let calculator = new Calculator();
                assert.strictEqual(calculator.exp(testCase.input), testCase.expected);
            });
        });

        // 測試錯誤情況
        const errorCases = [Infinity, -Infinity, NaN, 1000];
        errorCases.forEach((errorCase) => {
            it(`should throw error for input ${errorCase}`, function() {
                let calculator = new Calculator();
                assert.throws(() => calculator.exp(errorCase), Error);
            });
        });
    });

    describe('log()', function() {
        // 參數化測試案例
        const testCases = [
            { input: 2, expected: Math.log(2) },
            { input: 1, expected: Math.log(1) },
            { input: Math.E, expected: Math.log(Math.E) },
        ];
        testCases.forEach((testCase) => {
            it(`should return correct value for input ${testCase.input}`, function() {
                let calculator = new Calculator();
                assert.strictEqual(calculator.log(testCase.input), testCase.expected);
            });
        });

        // 測試錯誤情況
        const errorCases = [Infinity, -Infinity, NaN, -1, 0];
        errorCases.forEach((errorCase) => {
            it(`should throw error for input ${errorCase}`, function() {
                let calculator = new Calculator();
                assert.throws(() => calculator.log(errorCase), Error);
            });
        });
    });
});
