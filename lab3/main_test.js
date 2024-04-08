// 引入必要的模組
const assert = require('assert');
const { Calculator } = require('./main');

// 創建計算機實例
const calculator = new Calculator();

// 別名設定
const math = Math;
const error = Error;

// 測試函式
const test = (operation, testCases) => {
    describe(`Calculator.${operation}() Test`, () => {
        // 對於每個測試案例進行測試
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
};

// 導出測試函式
module.exports = test;
