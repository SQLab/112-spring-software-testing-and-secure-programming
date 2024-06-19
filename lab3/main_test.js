const { describe, it } = require('node:test');
const assert = require('assert');
const { Calculator } = require('./main');

describe('Calculator', () => {
    describe('exp', () => {
    // 測試 exp 方法正確計算指數函數
        it('should calculate the exponential function correctly', () => {
            const calculator = new Calculator();
            assert.strictEqual(calculator.exp(0), 1);
            assert.strictEqual(calculator.exp(1), Math.exp(1));
            assert.strictEqual(calculator.exp(2), Math.exp(2));
        });
// 測試 exp 方法當傳入不支援的操作數類型時是否拋出錯誤
        it('should throw an error for unsupported operand type', () => {
            const calculator = new Calculator();
            assert.throws(() => calculator.exp(NaN), Error);
            assert.throws(() => calculator.exp(Infinity), Error);
        });
// 測試 exp 方法當計算結果溢出時是否拋出溢出錯誤
        it('should throw an error for overflow', () => {
            const calculator = new Calculator();
            assert.throws(() => calculator.exp(1000), Error);
        });
    });

    describe('log', () => {
    // 測試 log 方法正確計算自然對數
        it('should calculate the natural logarithm correctly', () => {
            const calculator = new Calculator();
            assert.strictEqual(calculator.log(1), 0);
            assert.strictEqual(calculator.log(Math.E), 1);
        });
// 測試 log 方法當傳入不支援的操作數類型時是否拋出錯誤
        it('should throw an error for unsupported operand type', () => {
            const calculator = new Calculator();
            assert.throws(() => calculator.log(NaN), Error);
            assert.throws(() => calculator.log(Infinity), Error);
            assert.throws(() => calculator.log(0), Error);
            assert.throws(() => calculator.log(-1), Error);
        });
// 測試 log 方法當計算結果為負無窮大或非數字時是否拋出相應錯誤
        it('should throw an error for math domain error (1)', () => {
            const calculator = new Calculator();
            assert.throws(() => calculator.log(0), Error);
        });

        it('should throw an error for math domain error (2)', () => {
            const calculator = new Calculator();
            assert.throws(() => calculator.log(-1), Error);
        });
    });
});
