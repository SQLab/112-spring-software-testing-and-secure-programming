const { describe, it } = require('node:test');
const assert = require('assert');
const { Calculator } = require('./main');

describe('Calculator', () => {
    const calculator = new Calculator();

    it('should calculate the exponential function correctly', () => {
        assert.strictEqual(calculator.exp(0), 1);
        assert.strictEqual(calculator.exp(1), Math.exp(1));
        assert.strictEqual(calculator.exp(2), Math.exp(2));
        
    });

    it('should calculate the natural logarithm correctly', () => {
        assert.strictEqual(calculator.log(1), 0);
        assert.strictEqual(calculator.log(Math.E), 1);
        assert.strictEqual(calculator.log(10), Math.log(10));
       
    });

   
});
