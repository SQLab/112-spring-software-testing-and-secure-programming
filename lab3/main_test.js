const { describe, it } = require('node:test');
const assert = require('assert');
const { Calculator } = require('./main');

// TODO: write your tests here
const { expect } = require('chai');
const Calculator = require('./Calculator'); // Assuming Calculator class is defined in Calculator.js

describe('Calculator', function() {
  describe('exp', function() {
    it('should compute the exponential value correctly', function() {
      const calculator = new Calculator();
      const testData = [
        { input: 0, expected: 1 },
        { input: 1, expected: Math.exp(1) },
        { input: 2, expected: Math.exp(2) },
        // Add more test cases as needed
      ];

      testData.forEach(({ input, expected }) => {
        expect(calculator.exp(input)).to.be.closeTo(expected, 0.0001); // Using closeTo for floating point comparison
      });
    });

    it('should throw an error for non-finite inputs', function() {
      const calculator = new Calculator();
      const testData = [
        NaN,
        Infinity,
        -Infinity,
        // Add more non-finite inputs as needed
      ];

      testData.forEach(input => {
        expect(() => calculator.exp(input)).to.throw('unsupported operand type');
      });
    });
  });
});
