const { describe, it } = require('node:test');
const assert = require('assert');
const { Calculator } = require('./main');

// Tests for exp function
describe("Test exp", () => {
    const calculator = new Calculator();
    const exp = calculator.exp;
    const testCases = [
        { param: "1", expectedError: Error },
        { param: 1000, expectedError: Error },
        { param: 2, expected: Math.exp(2) }
    ];
    testCases.forEach(({ param, expected, expectedError }) => {
        if (expectedError) {
            it("should throw an error", () => {
                assert.throws(() => {
                    exp(param);
                }, expectedError);
            });
        } else {
            it("should return expected value", () => {
                assert.strictEqual(exp(param), expected);
            });
        }
    });
});

// Tests for log function
describe("Test log", () => {
    const calculator = new Calculator();
    const log = calculator.log;
    const testCases = [
        { param: "1", expectedError: Error },
        { param: 0, expectedError: Error },
        { param: -1, expectedError: Error },
        { param: 2, expected: Math.log(2) }
    ];
    testCases.forEach(({ param, expected, expectedError }) => {
        if (expectedError) {
            it("should throw an error", () => {
                assert.throws(() => {
                    log(param);
                }, expectedError);
            });
        } else {
            it("should return expected value", () => {
                assert.strictEqual(log(param), expected);
            });
        }
    });
});
