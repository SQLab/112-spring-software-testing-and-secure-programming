const { describe, it } = require('node:test');
const assert = require('assert');
const { Calculator} = require('./main');

// TODO: write your tests here
describe("Test exp", () => {
    const calculator =new Calculator
    const exp = calculator.exp
    const exptestcass =[
        { param: "1", expectedError: Error },
        { param: 1000, expectedError: Error },
        { param: 2, expected: Math.exp(2) }
    ]
    exptestcass.forEach(({ param, expected,expectedError }) => {
        if (expectedError){
            it("expectedError", () => {
                assert.throws(() => {
                    exp(param);
                }, expectedError);
            })
        }else{
            it("expected", () => {
                assert.strictEqual(exp(param),expected)
            })
        }
    });
});
describe("Test log", () => {
    const calculator =new Calculator
    const log = calculator.log
    const logtestcass =[
        { param: "1", logectedError: Error },
        { param: 0, logectedError: Error },
        { param: -1, logectedError: Error },
        { param: 2, logected: Math.log(2) }
    ]
    logtestcass.forEach(({ param, logected,logectedError }) => {
        if (logectedError){
            it("logectedError", () => {
                assert.throws(() => {
                    log(param);
                }, logectedError);
            })
        }else{
            it("logected", () => {
                assert.strictEqual(log(param),logected)
            })
        }
    });
});
