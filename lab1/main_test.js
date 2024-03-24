const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

test("Test MyClass's addStudent", () => {
    // TODO
    throw new Error("Test not implemented");
    const myclass = new MyClass();
    const Tony = new Student();
    Tony.setName('Tony');

    assert.strictEqual(myclass.students.length, 0);

    assert.strictEqual(myclass.addStudent("student"), -1);

    myclass.addStudent(Tony);
    assert.strictEqual(myclass.students.length, 1);
});

test("Test MyClass's getStudentById", () => {
    // TODO
    throw new Error("Test not implemented");
    const myclass = new MyClass();
    const Tony = new Student();
    Tony.setName('Tony');
    myclass.addStudent(Tony);

    assert.strictEqual(myclass.getStudentById(10), null);
    assert.strictEqual(myclass.getStudentById(0), Tony);
    assert.strictEqual(myclass.getStudentById("Tony"), undefined);
    assert.strictEqual(myclass.getStudentById(-1), null);
});

test("Test Student's setName", () => {
    // TODO
    throw new Error("Test not implemented");
    const Jerry = new Student();

    Jerry.setName(123);
    assert.strictEqual(Jerry.name, undefined);

    Jerry.setName("Jerry");
    assert.strictEqual(Jerry.name, "Jerry");
});

test("Test Student's getName", () => {
    // TODO
    throw new Error("Test not implemented");
});
    const Ron = new Student();

    assert.strictEqual(Ron.getName(), "");

    Ron.setName("Ron");
    assert.strictEqual(Ron.getName(), "Ron");
});