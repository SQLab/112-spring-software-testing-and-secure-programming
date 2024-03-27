const test = require('node:test');
const assert = require('assert');
const { Calculator } = require('./main');

test('Calculator.exp', () => {
    const calculator = new Calculator();

    // 正常情況
    assert.strictEqual(calculator.exp(1), Math.E);
    
    // 期望拋出 overflow 錯誤
    assert.throws(() => {
        calculator.exp(1000);
    }, new Error('overflow'));
    
    // 期望拋出 unsupported operand type 錯誤
    assert.throws(() => {
        calculator.exp('string');
    }, new Error('unsupported operand type'));

    assert.throws(() => {
        calculator.exp(Infinity);
    }, new Error('unsupported operand type'));
});

test('Calculator.log', () => {
    const calculator = new Calculator();

    // 正常情況
    assert.strictEqual(calculator.log(Math.E), 1);
    
    // math domain error (1)
    assert.throws(() => {
        calculator.log(0);
    }, new Error('math domain error (1)'));
    
    // math domain error (2)
    assert.throws(() => {
        calculator.log(-1);
    }, new Error('math domain error (2)'));
    
    // 期望拋出 unsupported operand type 錯誤
    assert.throws(() => {
        calculator.log('string');
    }, new Error('unsupported operand type'));

    assert.throws(() => {
        calculator.log(Infinity);
    }, new Error('unsupported operand type'));
});
