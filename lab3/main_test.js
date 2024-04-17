const assert = require(assert);
const { Calculator } = require('./main');

describe('Calculator', function() {
    const calculator = new Calculator();

    describe('#exp()', function() {
        it('should calculate correctly for valid inputs', function() {
            assert.strictEqual(calculator.exp(0), 1);
            assert.strictEqual(calculator.exp(1), Math.exp(1));
            assert.strictEqual(calculator.exp(-1), 1 / Math.exp(1));
        });

        it('should throw an error for invalid inputs', function() {
            assert.throws(() => calculator.exp('a'), Error, 'unsupported operand type');
            assert.throws(() => calculator.exp(1000), Error, 'overflow');
        });
    });

    describe('#log()', function() {
        it('should calculate correctly for valid inputs', function() {
            assert.strictEqual(calculator.log(1), 0);
            assert.strictEqual(calculator.log(Math.E), 1);
        });

        it('should throw an error for invalid inputs', function() {
            assert.throws(() => calculator.log('a'), Error, 'unsupported operand type');
            assert.throws(() => calculator.log(0), Error, 'math domain error (1)');
            assert.throws(() => calculator.log(-1), Error, 'math domain error (2)');
        });
    });
});
