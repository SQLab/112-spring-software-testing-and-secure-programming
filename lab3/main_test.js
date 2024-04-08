const { describe, it } = require('node:test');
const assert = require('assert');
const { Calculator } = require('./main'); // 确保这是导入 Calculator 类的唯一地方

describe('Calculator', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  describe('exp method', () => {
    it('should correctly calculate the exponential of a number', async () => {
      assert.strictEqual(calculator.exp(1), Math.exp(1));
    });

    it('should throw an "overflow" error for large numbers', async () => {
      assert.throws(() => {
        calculator.exp(1000);
      }, new Error('overflow'));
    });

    it('should throw "unsupported operand type" for non-numeric inputs', async () => {
      assert.throws(() => {
        calculator.exp('a');
      }, new Error('unsupported operand type'));
    });
  });

  describe('log method', () => {
    it('should correctly calculate the natural logarithm of a number', async () => {
      assert.strictEqual(calculator.log(Math.E), 1);
    });

    it('should throw a "math domain error (1)" for negative numbers', async () => {
      assert.throws(() => {
        calculator.log(-1);
      }, new Error('math domain error (1)'));
    });

    it('should throw a "math domain error (2)" for zero', async () => {
      assert.throws(() => {
        calculator.log(0);
      }, new Error('math domain error (2)'));
    });

    it('should throw "unsupported operand type" for non-numeric inputs', async () => {
      assert.throws(() => {
        calculator.log('a');
      }, new Error('unsupported operand type'));
    });
  });
});
