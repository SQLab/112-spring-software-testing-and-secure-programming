const { describe, it } = require('node:test');
const assert = require('assert');
const { Calculator } = require('./main');

// TODO: write your tests here
describe('Calculate', (t) =>{
    const calculator = new Calculator();
    
    it('test exp() functionality', () => {
        const testcases = [
            { param: Infinity, expected: Error, msg: 'unsupported operand type'},
            { param: -Infinity, expected: Error, msg: 'unsupported operand type'},
            { param: NaN, expected: Error, msg: 'unsupported operand type'},
            { param: 'abc', expected: Error, msg: 'unsupported operand type'},
            { param: true, expected: Error, msg: 'unsupported operand type'},
            { param: null, expected: Error, msg: 'unsupported operand type'},
            { param: undefined, expected: Error, msg: 'unsupported operand type'},
            { param: {}, expected: Error, msg: 'unsupported operand type'},
    
            { param: Number.MAX_VALUE, expected: Error, msg: 'overflow' },
    
            { param: 42, expected: Math.exp(42)},
            { param: 3.14, expected: Math.exp(3.14)},
            { param: 0, expected: Math.exp(0)}
        ];
        for (const tc of testcases) {
            if (tc.expected === Error) {
              assert.throws(() => {
                calculator.exp(tc.param);
            }, 
            { 
                name: 'Error', 
                message: tc.msg
            });
            } else {
              assert.strictEqual(calculator.exp(tc.param), tc.expected);
            }
        }
    });
    it('test log() functionality', () => {
        const testcases = [
            { param: Infinity, expected: Error, msg: 'unsupported operand type'},
            { param: -Infinity, expected: Error, msg: 'unsupported operand type'},
            { param: true, expected: Error, msg: 'unsupported operand type'},
            { param: 'abc', expected: Error, msg: 'unsupported operand type'},

            { param: 0, expected: Error, msg: "math domain error (1)" },
            { param: -1, expected: Error, msg: 'math domain error (2)'},

            { param: 42, expected: Math.log(42)},
            { param: 3.14, expected: Math.log(3.14)},
        ];

        for (const tc of testcases) {
            if(tc.expected === Error){
                assert.throws(() =>{
                    calculator.log(tc.param);
                },{
                    name: 'Error',
                    message: tc.msg
                });
            }else{
                assert.strictEqual(calculator.log(tc.param), tc.expected);
            }
        }
    });

});