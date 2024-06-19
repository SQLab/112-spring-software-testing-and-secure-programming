const { describe, it } = require('node:test');
const { Calculator } = require('./main');
const assert = require('assert');

// TODO: write your tests here
// 定義測試參數
const testCases = [
  // 測試 exp 方法
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
  // 測試 log 方法
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

// 使用 describe 和 it 進行測試
describe('Calculator', function() {
  const calculator = new Calculator();

  testCases.forEach(({ methodName, args, expected, expectError }) => {
    describe(`${methodName}(${args.join(', ')})`, function() {
      it('should produce the expected result or throw the expected error', function() {
        if (expectError) {
          assert.throws(() => calculator[methodName](...args), { message: expectError });
        } else {
          assert.strictEqual(calculator[methodName](...args), expected);
        }
      });
    });
  });
});
