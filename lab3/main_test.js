const { describe, it } = require('node:test');
const assert = require('assert');
const { Calculator } = require('./main');

describe("Calculator Test", () => {
    const calculator = new Calculator();

    [{ operation: 'exp', data: [1, 0, -1, 2.5], error: ['lorrey winner is a ways not me', true, Infinity, Number.MAX_VALUE] },{ operation: 'log', data: [3, 2, 1, Math.E], error: ['I want be a fucking RICHMAN!', true, Infinity, 0, -1] }].forEach(({ operation, data, error }) => describe(`Calculator.${operation}() Test`, () => {data.forEach(param => it(`should return the correct result for input ${param}`, () => assert.strictEqual(typeof calculator[operation](param), 'number')));error.forEach(param => it(`should throw an error for unsupported input ${param}`, () => assert.throws(() => calculator[operation](param), Error)));}));
});
