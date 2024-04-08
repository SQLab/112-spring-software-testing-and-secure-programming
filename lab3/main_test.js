
        expTests.forEach(({ param, expected, msg }) => {
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
        const logTests = [
            { param: 1, expected : Math.log(1)},
            { param: 0.5, expected : Math.log(0.5)},
            { param: -1, expected: Error, msg: 'math domain error (2)' },
            { param: 0, expected: Error, msg: 'math domain error (1)' },
            { param: 'text', expected: Error, msg: 'unsupported operand type' },
            { param: Infinity, expected: Error, msg: 'unsupported operand type' },
            { param: -Infinity, expected: Error, msg: 'unsupported operand type' }
        ];

        logTests.forEach(({ param, expected, msg }) => {
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
