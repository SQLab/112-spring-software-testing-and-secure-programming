const assert = require('assert');
const Calculator = require('./main').Calculator;

// TODO: write your tests here

describe('Calculator', function () {

    describe('exp', function () {
        it('should calculate correctly for 0, 1, and -1', function () {
            const calculator = new Calculator();     
            assert.strictEqual(calculator.exp(0), 1);
            assert.strictEqual(calculator.exp(1), Math.exp(1));
            assert.strictEqual(calculator.exp(-1), 1 / Math.exp(1));
        });

        it('should throw an error for NaN, Infinity, and -Infinity', function () {
            const calculator = new Calculator();
            assert.throws(function () { calculator.exp(NaN) }, Error);
            assert.throws(function () { calculator.exp(Infinity) }, Error);
            assert.throws(function () { calculator.exp(-Infinity) }, Error);
        });

        it('should throw an error for overflow', function () {
            const calculator = new Calculator();
            assert.throws(function () { calculator.exp(9999) }, Error);
        });
    });

    describe('log', function () {
        it('should calculate correctly for 1 and Math.E', function () {
            const calculator = new Calculator();
            assert.strictEqual(calculator.log(1), 0);
            assert.strictEqual(calculator.log(Math.E), 1);
        });

        it('should throw an error for NaN, Infinity, and -Infinity', function () {
            const calculator = new Calculator();
            assert.throws(function () { calculator.log(NaN) }, Error);
            assert.throws(function () { calculator.log(Infinity) }, Error);
            assert.throws(function () { calculator.log(-Infinity) }, Error);
        });

        it('should throw an error for 0 and -1', function () {
            const calculator = new Calculator();
            assert.throws(function () { calculator.log(0) }, Error);
            assert.throws(function () { calculator.log(-1) }, Error);
        });
    });
});
