const assert = require('assert');
const Calculator = require('./main').Calculator;


describe("Calculator", function () {
    describe("exp", function () {
        const cal = new Calculator();

        it("should throw an error for unsupported operand type", function () {
            assert.throws(function () { cal.exp('a') }, Error, 'unsupported operand type');
        });

        it("should throw an error for overflow", function () {
            assert.throws(function () { cal.exp(1000) }, Error, 'overflow');
        });

        it("should return 1 for input 0", function () {
            assert.strictEqual(cal.exp(0), 1);
        });
    });

    describe("log", function () {
        const cal = new Calculator();

        it("should throw an error for unsupported operand type", function () {
            assert.throws(function () { cal.log('a') }, Error, 'unsupported operand type');
        });

        it("should throw an error for math domain error (1)", function () {
            assert.throws(function () { cal.log(0) }, Error, 'math domain error (1)');
        });

        it("should throw an error for math domain error (2)", function () {
            assert.throws(function () { cal.log(-1) }, Error, 'math domain error (2)');
        });

        it("should return 0 for input 1", function () {
            assert.strictEqual(cal.log(1), 0);
        });
    });
});
