const { describe, it } = require('node:test');
const assert = require('assert');
const { Calculator } = require('./main');

// TODO: write your tests here
describe("Calculator Test", () => {
    const calculator = new Calculator();

    it("Calculator.exp() Test", () => {
        let testcases = [
            { param: 1, expected: Math.exp(1) },
            { param: 0, expected: Math.exp(0) },
            { param: -1, expected: Math.exp(-1) },
            { param: 3.14, expected: Math.exp(3.14) },

            { param: 'AAA', expected: Error, msg: "unsupported operand type" },
            { param: true, expected: Error, msg: "unsupported operand type" },

            { param: Infinity, expected: Error, msg: 'unsupported operand type' },
            { param: -Infinity, expected: Error, msg: 'unsupported operand type' },
            { param: NaN, expected: Error, msg: 'unsupported operand type' },

            { param: Number.MAX_VALUE, expected: Error, msg: "overflow" },
        ];


        for (const tc of testcases) {
            if (tc.expected === Error) {
                assert.throws(() => {
                    calculator.exp(tc.param);
                },
                    {
                        name: 'Error',
                        message: tc.msg
                    });
            } else {
                assert.strictEqual(calculator.exp(tc.param), tc.expected);
            }
        }

    });

    it("Calculator.log() Test", () => {
        let testcases = [
            { param: 3, expected: Math.log(3) },
            { param: 2, expected: Math.log(2) },
            { param: 1, expected: Math.log(1) },
            { param: 3.14, expected: Math.log(3.14) },

            { param: 'AAA', expected: Error, msg: "unsupported operand type" },
            { param: true, expected: Error, msg: "unsupported operand type" },
            { param: Infinity, expected: Error, msg: "unsupported operand type" },
            { param: -Infinity, expected: Error, msg: 'unsupported operand type' },

            { param: 0, expected: Error, msg: "math domain error (1)" },
            { param: -1, expected: Error, msg: "math domain error (2)" },
        ];

        for (const tc of testcases) {
            if (tc.expected === Error) {
                assert.throws(() => {
                    calculator.log(tc.param);
                }, {
                    name: 'Error',
                    message: tc.msg
                });
            } else {
                assert.strictEqual(calculator.log(tc.param), tc.expected);
            }
        }
    });
});