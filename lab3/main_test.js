const { describe, it } = require('node:test');
const assert = require('assert');
const { Calculator } = require('./main');



// TODO: write your tests here
describe('Calculate', (t) =>{
    const calculator = new Calculator();

    it('alculator_exp()', () => {
        const testcase = [
            {param:1,expected: Math.exp(1)},
            {param:2,expected: Math.exp(2)},
            {param: Number.MAX_VALUE, expected: Error, msg: 'overflow' },
            {param:null,expected: Error, msg:'unsupported operand type'},
            {param:'ABC',expected: Error, msg:'unsupported operand type'}  
        ];
        for (const tc of testcase) {
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
    it('Calculator_log()', () => {
        const testcase = [
            {param:1, expected: Math.log(1)},
            {param: 0, expected: Error, msg: "math domain error (1)" },
            {param:-2 ,expected: Error,msg: 'math domain error (2)'},            
            {param:null,expected: Error, msg:'unsupported operand type'},
            {param:'ABC',expected: Error, msg:'unsupported operand type'}  
        ];

        for (const tc of testcase) {
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
