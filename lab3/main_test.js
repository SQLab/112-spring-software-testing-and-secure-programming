const { describe, it } = require('node:test');
const assert = require('assert');
const { Calculator } = require('./main');

// TODO: write your tests here

describe("Calculator Test", () => {
    const calculator = new Calculator();
    
    const TESTLAB = [
        {
            operation: "exp",
            cases: [
                { varA: 1, expectedOutput: Math.exp(1) },
                { varA: 0, expectedOutput: Math.exp(0) },
                { varA: -1, expectedOutput: Math.exp(-1) },
                { varA: '洗勒哈囉？', expectedOutput: Error, message: "unsupported operand type" },
                { varA: true, expectedOutput: Error, message: "unsupported operand type" },
                { varA: Infinity, expectedOutput: Error, message: "unsupported operand type" },
                { varA: Number.MAX_VALUE, expectedOutput: Error, message: "overflow" },
            ]
        },
        {
            operation: "log",
            cases: [
                { varA: 3, expectedOutput: Math.log(3) },
                { varA: 2, expectedOutput: Math.log(2) },
                { varA: 1, expectedOutput: Math.log(1) },
                { varA: '醉SUMER死', expectedOutput: Error, message: "unsupported operand type" },
                { varA: true, expectedOutput: Error, message: "unsupported operand type" },
                { varA: Infinity, expectedOutput: Error, message: "unsupported operand type" },
                { varA: 0, expectedOutput: Error, message: "math domain error (1)" },
                { varA: -1, expectedOutput: Error, message: "math domain error (2)" },
            ]
        }
    ];

    TESTLAB.forEach(({ operation, cases }) => {
        it(`Calculator.${operation}() Test`, () => {
            cases.forEach(({ varA: param, expectedOutput: expected, message: msg }) => {
                if (expected === Error) {
                    assert.throws(() => calculator[operation](param), expected, msg);
                } else {
                    assert.strictEqual(calculator[operation](param), expected);
                }
            });
        });
    });
});


