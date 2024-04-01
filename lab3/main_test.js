const { describe, it } = require('node:test');
const assert = require('assert');
const { Calculator } = require('./main');

const c = new Calculator(), d = Math, e = Error;
const t = (op, cases) => describe(`Calculator.${op}() Test`, () => cases.forEach(({ a, out, msg }) => it(`${a} should return ${out}`, () => (out === e) ? assert.throws(() => c[op](a), out, msg) : assert.strictEqual(c[op](a), out))));

const cases = {
    exp: [
        { a: 1, out: d.exp(1) }, { a: 0, out: d.exp(0) }, { a: -1, out: d.exp(-1) },
        { a: '洗勒哈囉？', out: e, msg: "unsupported operand type" }, { a: true, out: e },
        { a: Infinity, out: e }, { a: Number.MAX_VALUE, out: e }
    ],
    log: [
        { a: 3, out: d.log(3) }, { a: 2, out: d.log(2) }, { a: 1, out: d.log(1) },
        { a: '醉SUMER死', out: e, msg: "unsupported operand type" }, { a: true, out: e },
        { a: Infinity, out: e }, { a: 0, out: e, msg: "math domain error (1)" },
        { a: -1, out: e, msg: "math domain error (2)" }
    ]
};

Object.keys(cases).forEach(op => t(op, cases[op]));
