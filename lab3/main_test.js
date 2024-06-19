const { describe, it } = require('node:test');
const { Calculator } = require('./main');
const assert = require('assert');

const testCases = [
  {
    methodName: 'exp',
    args: [10],
    expected: Math.exp(10),
    expectError: null
  },
  {
    methodName: 'exp',
    args: [1000],
    expected: null,
    expectError: 'overflow'
  },
  {
    methodName: 'exp',
    args: ['string'],
    expected: null,
    expectError: 'unsupported operand type'
  },
  {
    methodName: 'exp',
    args: [Infinity],
    expected: null,
    expectError: 'unsupported operand type'
  },
  {
    methodName: 'log',
    args: [10],
    expected: Math.log(10),
    expectError: null
  },
  {
    methodName: 'log',
    args: [0],
    expected: null,
    expectError: 'math domain error (1)'
  },
  {
    methodName: 'log',
    args: [-1],
    expected: null,
    expectError: 'math domain error (2)'
  },
  {
    methodName: 'log',
    args: ['string'],
    expected: null,
    expectError: 'unsupported operand type'
  },
  {
    methodName: 'log',
    args: [Infinity],
    expected: null,
    expectError: 'unsupported operand type'
  }
];

describe('Calculator', () => {
  const calculator = new Calculator();

  testCases.forEach(({ methodName, args, expected, expectError }) => {
    describe(`${methodName}(${args.join(', ')})`, () => {
      it('should produce the expected result or throw the expected error', () => {
        const method = calculator[methodName].bind(calculator, ...args);
        if (expectError) {
          assert.throws(method, { message: expectError });
        } else {
          assert.strictEqual(method(), expected);
        }
      });
    });
  });
});
