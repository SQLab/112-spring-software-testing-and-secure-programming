const { describe, it } = require('node:test');
const assert = require('assert');
const { Calculator } = require('./main');

describe("calculator exp test", () => {
    const cal = new Calculator();

    it("should throw an error for unsupported operand type", () => {
        assert.throws(() => cal.exp('a'), Error, 'unsupported operand type');
    });

    it("should throw an error for overflow", () => {
        assert.throws(() => cal.exp(1000), Error, 'overflow');
    });

    it("should return 1 for input 0", () => {
        assert.strictEqual(cal.exp(0), 1);
    });
});

describe("calculator log test", () => {
    const cal = new Calculator();

    it("should throw an error for unsupported operand type", () => {
        assert.throws(() => cal.log('a'), Error, 'unsupported operand type');
    });

    it("should throw an error for math domain error (1)", () => {
        assert.throws(() => cal.log(0), Error, 'math domain error (1)');
    });

    it("should throw an error for math domain error (2)", () => {
        assert.throws(() => cal.log(-1), Error, 'math domain error (2)');
    });

    it("should return 0 for input 1", () => {
        assert.strictEqual(cal.log(1), 0);
    });
});

