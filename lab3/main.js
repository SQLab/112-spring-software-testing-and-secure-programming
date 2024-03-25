const { describe, it } = require('node:test');
const assert = require('assert');
const { Calculator } = require('./main');

describe('Calculator', () => {
  describe('add', () => {
    it('should add two numbers correctly', () => {
      const result = Calculator.add(3, 5);
      assert.strictEqual(result, 8);
    });

    it('should throw an error if any parameter is not a number', () => {
      assert.throws(() => {
        Calculator.add(3, '5');
      }, TypeError);
    });

    it('should add negative numbers correctly', () => {
      const result = Calculator.add(-3, -5);
      assert.strictEqual(result, -8);
    });

    it('should add a positive and a negative number correctly', () => {
      const result = Calculator.add(-3, 5);
      assert.strictEqual(result, 2);
    });

    it('should add decimals correctly', () => {
      const result = Calculator.add(3.5, 2.5);
      assert.strictEqual(result, 6);
    });
  });

  describe('subtract', () => {
    it('should subtract two numbers correctly', () => {
      const result = Calculator.subtract(10, 4);
      assert.strictEqual(result, 6);
    });

    it('should throw an error if any parameter is not a number', () => {
      assert.throws(() => {
        Calculator.subtract('10', 4);
      }, TypeError);
    });

    it('should subtract negative numbers correctly', () => {
      const result = Calculator.subtract(-10, -4);
      assert.strictEqual(result, -6);
    });

    it('should subtract a positive number from a negative number correctly', () => {
      const result = Calculator.subtract(-10, 4);
      assert.strictEqual(result, -14);
    });

    it('should subtract decimals correctly', () => {
      const result = Calculator.subtract(10.5, 3.5);
      assert.strictEqual(result, 7);
    });
  });

  describe('multiply', () => {
    it('should multiply two numbers correctly', () => {
      const result = Calculator.multiply(2, 6);
      assert.strictEqual(result, 12);
    });

    it('should throw an error if any parameter is not a number', () => {
      assert.throws(() => {
        Calculator.multiply(2, '6');
      }, TypeError);
    });

    it('should multiply negative numbers correctly', () => {
      const result = Calculator.multiply(-2, -6);
      assert.strictEqual(result, 12);
    });

    it('should multiply a negative and a positive number correctly', () => {
      const result = Calculator.multiply(-2, 6);
      assert.strictEqual(result, -12);
    });

    it('should multiply decimals correctly', () => {
      const result = Calculator.multiply(2.5, 3);
      assert.strictEqual(result, 7.5);
    });
  });

  describe('divide', () => {
    it('should divide two numbers correctly', () => {
      const result = Calculator.divide(20, 5);
      assert.strictEqual(result, 4);
    });

    it('should throw an error if dividing by zero', () => {
      assert.throws(() => {
        Calculator.divide(10, 0);
      }, Error);
    });

    it('should throw an error if any parameter is not a number', () => {
      assert.throws(() => {
        Calculator.divide('20', 5);
      }, TypeError);
    });

    it('should divide negative numbers correctly', () => {
      const result = Calculator.divide(-20, -5);
      assert.strictEqual(result, 4);
    });

    it('should divide a negative number by a positive number correctly', () => {
      const result = Calculator.divide(-20, 5);
      assert.strictEqual(result, -4);
    });

    it('should handle decimal division correctly', () => {
      const result = Calculator.divide(10, 3);
      assert.strictEqual(result, 3.3333333333333335);
    });
  });

  describe('exp', () => {
    it('should calculate the exponent correctly', () => {
      const result = Calculator.exp(2);
      assert.strictEqual(result, Math.exp(2));
    });

    it('should throw an error if the parameter is not a number', () => {
      assert.throws(() => {
        Calculator.exp('2');
      }, TypeError);
    });

    it('should throw an error if the result is Infinity', () => {
      assert.throws(() => {
        Calculator.exp(1000);
      }, Error);
    });

    it('should handle negative numbers correctly', () => {
      const result = Calculator.exp(-2);
      assert.strictEqual(result, Math.exp(-2));
    });
  });

  describe('log', () => {
    it('should calculate the natural logarithm correctly', () => {
      const result = Calculator.log(10);
      assert.strictEqual(result, Math.log(10));
    });

    it('should throw an error if the parameter is not a number', () => {
      assert.throws(() => {
        Calculator.log('10');
      }, TypeError);
    });

    it('should throw an error if the result is -Infinity', () => {
      assert.throws(() => {
        Calculator.log(0);
      }, Error);
    });

    it('should throw an error if the result is NaN', () => {
      assert.throws(() => {
        Calculator.log(-10);
      }, Error);
    });
  });
});
