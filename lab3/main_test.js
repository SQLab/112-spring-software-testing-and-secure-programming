const { describe, it } = require('node:test');
const assert = require('assert');
const { Calculator } = require('./main');

// TODO: write your tests here
// <<<<<<< lab3
// 定義測試套件
describe('Calculator', () => {
    const calculator = new Calculator(); // 實例化計算器

    // 對exp方法進行參數化測試
    describe('exp method with parameterized tests', () => {
        // 測試案例集合
        const testCases = [
            { params: [1], expected: Math.exp(1) }, // 正常情況
            { params: ['string'], expected: /unsupported operand type/, error: true }, // 錯誤類型測試
            { params: [1000], expected: /overflow/, error: true }, // 溢出錯誤
            { params: [Number.MAX_VALUE], expected: /overflow/, error: true }, // 邊界值測試
        ];

        // 遍歷執行每個測試案例
        testCases.forEach(({ params, expected, error }) => {
            const input = params.join(', ');
            it(`exp with argument(s) ${input} ${error ? 'throws an error' : 'returns correct value'}`, () => {
                if (error) {
                    console.log(`測試輸入: ${input}，預期引發錯誤`); // 調試語句
                    assert.throws(() => calculator.exp(...params), expected); // 斷言應該拋出錯誤
                } else {
                    console.log(`測試輸入: ${input}，預期結果: ${expected}`); // 調試語句
                    assert.strictEqual(calculator.exp(...params), expected); // 斷言應該返回預期結果
                }
            });
        });
    });

    // 對log方法進行參數化測試
    describe('log method with parameterized tests', () => {
        // 測試案例集合
        const testCases = [
            { params: [Math.E], expected: Math.log(Math.E) }, // 正常情況
            { params: ['string'], expected: /unsupported operand type/, error: true }, // 錯誤類型測試
            { params: [-1], expected: /math domain error \(1\)/, error: true }, // 數學定義域錯誤
            { params: [0], expected: /math domain error \(2\)/, error:true }, // 數學定義域錯誤
            { params: [Infinity], expected: /unsupported operand type/, error: true }, // 處理無窮大輸入
            { params: [-Infinity], expected: /unsupported operand type/, error: true } // 處理負無窮大輸入
            ];
                // 遍歷執行每個測試案例
    testCases.forEach(({ params, expected, error }) => {
        const input = params.join(', ');
        it(`log with argument(s) ${input} ${error ? 'throws an error' : 'returns correct value'}`, () => {
            if (error) {
                console.log(`測試輸入: ${input}，預期引發錯誤`); // 調試語句
                assert.throws(() => calculator.log(...params), expected); // 斷言應該拋出錯誤
            } else {
                console.log(`測試輸入: ${input}，預期結果: ${expected}`); // 調試語句
                assert.strictEqual(calculator.log(...params), expected); // 斷言應該返回預期結果
            }
        });
    });
});
});
// =======
// >>>>>>> 511559023
