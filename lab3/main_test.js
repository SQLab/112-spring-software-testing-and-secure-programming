const { describe, it } = require('node:test');
const assert = require('assert');
const { Calculator } = require('./main');

// TODO: write your tests here

describe('Calculator', () => {
    
    describe('exp', () => {
        // 檢查 exp 方法在輸入 0、1 和 -1 時。
        it('Calculate correctly', () => {
            const calculator = new Calculator();     
            assert.strictEqual(calculator.exp(0), 1);
            assert.strictEqual(calculator.exp(1), Math.exp(1));
            assert.strictEqual(calculator.exp(-1), 1 / Math.exp(1));
        });
        // 檢查 exp 方法在Infinity(-) 時。
        it('Calculate error', () => {
            const calculator = new Calculator();
            assert.throws(() => calculator.exp(NaN), Error);
            assert.throws(() => calculator.exp(Infinity), Error);
            assert.throws(() => calculator.exp(-Infinity), Error);
        });
        // 檢查 exp 方法在 overflow 時。
        it('overflows', () => {
            const calculator = new Calculator();
            assert.throws(() => calculator.exp(9999), Error);
        });
    });

    describe('log', () => {
        // 檢查 log 方法在輸入 1 和 Math.E 時
        it('calculate orrectly', () => {
            const calculator = new Calculator();
            assert.strictEqual(calculator.log(1), 0);
            assert.strictEqual(calculator.log(Math.E), 1);
        });
        //檢查 log 方法在輸入 NaN、Infinity時
        it('Calculate error', () => {
            const calculator = new Calculator();
            assert.throws(() => calculator.log(NaN), Error);
            assert.throws(() => calculator.log(Infinity), Error);
            assert.throws(() => calculator.log(-Infinity), Error);
        });
        // 檢查 log 方法在輸入 0 和 -1 時
        it('negative infinity or NaN', () => {
            const calculator = new Calculator();
            assert.throws(() => calculator.log(0), Error);
            assert.throws(() => calculator.log(-1), Error);
        });
    });
});
