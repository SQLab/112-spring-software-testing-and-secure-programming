const { describe, it } = require('node:test');
const assert = require('assert');
const { Calculator } = require('./main');

// TODO: write your tests here


// 建立測試組，描述 Calculator 類別的測試
describe("Calculator", () => {
    // 創建一個 Calculator 實例
    const calculator = new Calculator();

    // 測試 Calculator.exp() 方法
    it("Calculator.exp()", () => {
        // 定義 expTestcase 測試案例陣列，包含不同的參數和預期結果
        let expTestcase = [
            { param: 1, expected: Math.exp(1) },
            { param: 0, expected: Math.exp(0) },
            { param: -1, expected: Math.exp(-1) },
            { param: 'a4989', expected: Error, msg: "unsupported operand type" },
            { param: true, expected: Error, msg: "unsupported operand type" },
            { param: Infinity, expected: Error, msg: "unsupported operand type" },
            { param: Number.MAX_VALUE, expected: Error, msg: "overflow" },
        ];

        // 使用 map() 方法遍歷每個測試案例
        expTestcase.map(({ param, expected, msg }) => {
            // 如果預期結果是 Error，則使用 assert.throws() 斷言方法
            if (expected === Error) {
                assert.throws(() => calculator.exp(param), expected, msg);
            }
            // 否則使用 assert.strictEqual() 斷言方法
            else {
                assert.strictEqual(calculator.exp(param), expected);
            }
        });
    });

    // 測試 Calculator.log() 方法
    it("Calculator.log()", () => {
        // 定義 logTestcase 測試案例陣列，包含不同的參數和預期結果
        let logTestcase = [
            { param: 3, expected: Math.log(3) },
            { param: 2, expected: Math.log(2) },
            { param: 1, expected: Math.log(1) },
            { param: 'a4989', expected: Error, msg: "unsupported operand type" },
            { param: true, expected: Error, msg: "unsupported operand type" },
            { param: Infinity, expected: Error, msg: "unsupported operand type" },
            { param: 0, expected: Error, msg: "math domain error (1)" },
            { param: -1, expected: Error, msg: "math domain error (2)" },
        ];

        // 使用 map() 方法遍歷每個測試案例
        logTestcase.map(({ param, expected, msg }) => {
            // 如果預期結果是 Error，則使用 assert.throws() 斷言方法
            if (expected === Error) {
                assert.throws(() => calculator.log(param), expected, msg);
            }
            // 否則使用 assert.strictEqual() 斷言方法
            else {
                assert.strictEqual(calculator.log(param), expected);
            }
        });
    });
});