const { describe, it } = require('node:test');
const assert = require('assert');
const { Calculator } = require('./main');

class Calculator {
    exp(x) {
        if (!Number.isFinite(x)) {
            throw new Error('unsupported operand type');
        }
        const result = Math.exp(x);
        if (result === Infinity) {
            throw new Error('overflow');
        }
        return result;
    }

    log(x) {
        if (!Number.isFinite(x)) {
            throw new Error('unsupported operand type');
        }
        if (x < 0) {
            throw new Error('math domain error (1)');
        }
        if (x === 0) {
            throw new Error('math domain error (2)');
        }
        const result = Math.log(x);
        return result;
    }
}
