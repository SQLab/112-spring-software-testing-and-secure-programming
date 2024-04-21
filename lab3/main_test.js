const { describe, it } = require('node:test');
const assert = require('assert');
const { Calculator } = require('./main');

// 定義測試套件，對 Calculator 類進行測試
describe('Calculator', () => {
    // 對 exp 方法進行測試
    describe('exp', () => {
       // 測試用例
        it('should return the correct result for valid input', () => {
            const calculator = new Calculator();
            assert.strictEqual(calculator.exp(0), 1);
            assert.strictEqual(calculator.exp(1), Math.exp(1));
            assert.strictEqual(calculator.exp(2), Math.exp(2));
            assert.strictEqual(calculator.exp(-1), Math.exp(-1));
        });

        it('should throw an error for invalid input', () => {
            const calculator = new Calculator();
            assert.throws(() => calculator.exp('abc'), Error);
            assert.throws(() => calculator.exp(NaN), Error);
            assert.throws(() => calculator.exp(Infinity), Error);
        });

        it('should throw an error for overflow', () => {
            const calculator = new Calculator();
            assert.throws(() => calculator.exp(1000), Error);
        
        });
    });
    // 對 log 方法進行測試
    describe('log', () => {
        // 測試用例
        it('should return the correct result for valid input', () => {
            const calculator = new Calculator();
            assert.strictEqual(calculator.log(1), 0);
            assert.strictEqual(calculator.log(Math.exp(1)), 1);
            assert.strictEqual(calculator.log(Math.exp(2)), 2);
            assert.strictEqual(calculator.log(Math.exp(-1)), -1);
        });

        it('should throw an error for invalid input', () => {
            const calculator = new Calculator();
            assert.throws(() => calculator.log('abc'), Error);
            assert.throws(() => calculator.log(NaN), Error);
            assert.throws(() => calculator.log(-1), Error);
            assert.throws(() => calculator.log(0), Error);
        });

        it('should throw an error for math domain errors', () => {
            const calculator = new Calculator();
            assert.throws(() => calculator.log(-1), Error);
            assert.throws(() => calculator.log(0), Error);
        });
    });
});
