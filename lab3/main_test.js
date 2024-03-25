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
  });
});
