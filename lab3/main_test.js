const { describe, it } = require('node:test');
const assert = require('assert');
const { Calculator } = require('./main');

// TODO: write your tests here

describe('Calculator', () => {
    const calculator = new Calculator();

    describe('exp method with parameterized tests', () => {
        const testCases = [
            { params: [1], expected: Math.exp(1) },
            { params: ['string'], expected: /unsupported operand type/, error: true },
            { params: [1000], expected: /overflow/, error: true },
        ];

        testCases.forEach(({ params, expected, error }) => {
            const input = params.join(', ');
            it(`exp with argument(s) ${input} ${error ? 'throws an error' : 'returns correct value'}`, () => {
                if (error) {
                    assert.throws(() => calculator.exp(...params), expected);
                } else {
                    assert.strictEqual(calculator.exp(...params), expected);
                }
            });
        });
    });

    describe('log method with parameterized tests', () => {
        const testCases = [
            { params: [Math.E], expected: Math.log(Math.E) },
            { params: ['string'], expected: /unsupported operand type/, error: true },
            { params: [-1], expected: /math domain error \(1\)/, error: true },
            { params: [0], expected: /math domain error \(2\)/, error: true },
        ];

        testCases.forEach(({ params, expected, error }) => {
            const input = params.join(', ');
            it(`log with argument(s) ${input} ${error ? 'throws an error' : 'returns correct value'}`, () => {
                if (error) {
                    assert.throws(() => calculator.log(...params), expected);
                } else {
                    assert.strictEqual(calculator.log(...params), expected);
                }
            });
        });
    });
});
