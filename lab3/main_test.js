const { describe, it } = require('node:test');
const assert = require('assert');
const { Calculator } = require('./main');


describe('Calculator', () => {
    const calculator = new Calculator();

    describe('exp method with parameterized tests', () => {
        const exp = [
            { param: 0, expected: Math.exp(0) },
            { param: 1, expected: Math.exp(1) },
            { param: -1, expected: Math.exp(-1) },
            { param: 'text', expected: Error, msg: 'unsupported operand type' },
            { param: 9999, expected: Error, msg: 'overflow' },
            { param: Number.MAX_VALUE, expected: Error, msg: 'overflow' }
        ];

        exp.forEach(({ param, expected, msg }) => {
            it(`should return ${expected} when input is ${param}`, () => {
                if (expected === Error) {
                    assert.throws(() => calculator.exp(param), { message: msg });
                } else {
                    assert.strictEqual(calculator.exp(param), expected);
                }
            });
        });
    });

    describe('log method with parameterized tests', () => {
        const log = [
            { param: 1, expected : Math.log(1)},
            { param: 0.5, expected : Math.log(0.5)},
            { param: -1, expected: Error, msg: 'math domain error (2)' },
            { param: 0, expected: Error, msg: 'math domain error (1)' },
            { param: 'text', expected: Error, msg: 'unsupported operand type' },
            { param: Infinity, expected: Error, msg: 'unsupported operand type' },
            { param: -Infinity, expected: Error, msg: 'unsupported operand type' }
        ];

        log.forEach(({ param, expected, msg }) => {
            it(`should return ${expected} when input is ${param}`, () => {
                if (expected === Error) {
                    assert.throws(() => calculator.log(param), { message: msg });
                } else {
                    assert.strictEqual(calculator.log(param), expected);
                }
            });
        });
    });
});
