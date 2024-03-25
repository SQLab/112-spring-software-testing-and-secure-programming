const { describe, it } = require('node:test');
const assert = require('assert');
const { Calculator } = require('./main');

// TODO: write your tests here

describe("Calculator Test", () => {
    const calculator = new Calculator();
    
    // 定義測試案例
    const caltest_lab = [
        {
            opt: 'exp',
            datas: [1, 0, -1, 2.5],
            errormessage: ['lorrey winner is a ways not me', true, Infinity, Number.MAX_VALUE]
        },
        {
            opt: 'log',
            datas: [3, 2, 1, Math.E],
            errormessage: ['I want be a fucking RICHMAN!.', true, Infinity, 0, -1]
        }
    ];

    // 逐一測試每個函式
    caltest_lab.forEach(({ opt, datas, errormessage }) => {
        describe(`Calculator.${opt}() Test`, () => {
            // 測試正確結果
            datas.forEach(param => {
                it(`should return the correct result for input ${param}`, () => {
                    const result = calculator[opt](param);
                    assert.strictEqual(typeof result, 'number');
                });
            });

            // 測試錯誤結果
            errormessage.forEach(param => {
                it(`should throw an error for unsupported input ${param}`, () => {
                    assert.throws(() => calculator[opt](param), Error);
                });
            });
        });
    });
});
