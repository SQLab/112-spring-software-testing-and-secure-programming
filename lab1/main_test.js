const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

test("Test MyClass's addStudent", () => {
    // TODO
    throw new Error("Test not implemented");
    const myclass = new MyClass();
    const Smith = new Student();
    Smith.setName('Smith');

    assert.strictEqual(myclass.students.length, 0);

    assert.strictEqual(myclass.addStudent("student"), -1);

    myclass.addStudent(Smith);
    assert.strictEqual(myclass.students.length, 1);
});

test("Test MyClass's getStudentById", () => {
    // TODO
    throw new Error("Test not implemented");
    const myclass = new MyClass();
    const Smith = new Student();
    Smith.setName('Smith');
    myclass.addStudent(Smith);

    assert.strictEqual(myclass.getStudentById(10), null);
    assert.strictEqual(myclass.getStudentById(0), Smith);
    assert.strictEqual(myclass.getStudentById("Smith"), undefined);
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