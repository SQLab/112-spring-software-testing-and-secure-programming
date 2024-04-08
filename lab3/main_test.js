const Calculator = require('./main').Calculator; // 引入 Calculator
const assert = require('assert');

// 創建計算機實例
const calculator = new Calculator();

// 別名設定
const math = Math;
const error = Error;

// 測試函式
function runTests(operation, testCases) {
    describe(`Calculator.${operation}() Test`, () => {
        testCases.forEach(({ input, output, message }) => {
            it(`${input} 應該返回 ${output}`, () => {
                // 如果預期的結果是 Error，則使用 assert.throws()
                if (output === error) {
                    assert.throws(() => calculator[operation](input), output, message);
                } else {
                    // 否則使用 assert.strictEqual() 進行比較
                    assert.strictEqual(calculator[operation](input), output);
                }
            });
        });
    });
}

module.exports = runTests;
