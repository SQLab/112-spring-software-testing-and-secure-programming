import { describe, it } from 'node:test';
import assert from 'assert';
import { Calculator } from './main';

describe('Calculator', () => {

    describe('exp', () => {
        it('should calculate exp correctly', () => {
            const calculator = new Calculator();
            assert.strictEqual(calculator.exp(0), 1);
            assert.strictEqual(calculator.exp(1), Math.exp(1));
            assert.strictEqual(calculator.exp(-1), 1 / Math.exp(1));
        });

        it('should throw error for unsupported operand type', () => {
            const calculator = new Calculator();
            assert.throws(() => calculator.exp('a'), Error, 'unsupported operand type');
        });

        it('should throw error for overflow', () => {
            const calculator = new Calculator();
            assert.throws(() => calculator.exp(1000), Error, 'overflow');
        });
    });

    describe('log', () => {
        it('should calculate log correctly', () => {
            const calculator = new Calculator();
            assert.strictEqual(calculator.log(1), 0);
            assert.strictEqual(calculator.log(Math.E), 1);
        });

        it('should throw error for unsupported operand type', () => {
            const calculator = new Calculator();
            assert.throws(() => calculator.log('a'), Error, 'unsupported operand type');
        });

        it('should throw error for math domain error (1)', () => {
            const calculator = new Calculator();
            assert.throws(() => calculator.log(0), Error, 'math domain error (1)');
        });

        it('should throw error for math domain error (2)', () => {
            const calculator = new Calculator();
            assert.throws(() => calculator.log(-1), Error, 'math domain error (2)');
        });
    });
});
