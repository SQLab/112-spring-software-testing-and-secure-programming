const { Calculator } = require('./main');
const assert = require('assert');

describe('Calculator', () => {
    const calculator = new Calculator();

    const testCasesExp = [
        { input: 2, expected: Math.exp(2), description: 'Calculate exp(2)' },
        { input: 3, expected: Math.exp(3), description: 'Calculate exp(3)' },
        { input: -1, expected: 1 / Math.exp(1), description: 'Calculate exp(-1)' }
    ];

    testCasesExp.forEach(({ input, expected, description }) => {
        it(description, () => {
            assert.strictEqual(calculator.exp(input), expected);
        });
    });

    const testCasesLog = [
        { input: Math.E, expected: 1, description: 'Calculate log(Math.E)' },
        { input: 1, expected: Math.log(1), description: 'Calculate log(1)' },
        { input: 4, expected: Math.log(4), description: 'Calculate log(4)' }
    ];

    testCasesLog.forEach(({ input, expected, description }) => {
        it(description, () => {
            assert.strictEqual(calculator.log(input), expected);
        });
    });

    const errorCases = [
        { input: 'string', expectedError: /unsupported operand type/, description: 'Test passing a string' },
        { input: 0, expectedError: /math domain error \(1\)/, description: 'Test passing 0' },
        { input: -1, expectedError: /math domain error \(2\)/, description: 'Test passing -1' }
    ];

    errorCases.forEach(({ input, expectedError, description }) => {
        it(description, () => {
            assert.throws(() => calculator.log(input), expectedError);
        });
    });
});
