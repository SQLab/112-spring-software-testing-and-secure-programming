const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

test("Test MyClass's addStudent", () => {
    // TODO
    throw new Error("Test not implemented");
    const myclass = new MyClass();
    const alpha = new Student();
    alpha.setName('Smith');

    assert.strictEqual(myclass.students.length, 0);

    assert.strictEqual(myclass.addStudent("student"), -1);

    myclass.addStudent(Smith);
    assert.strictEqual(myclass.students.length, 1);
});

test("Test MyClass's getStudentById", () => {
    // TODO
    throw new Error("Test not implemented");
    const myclass = new MyClass();
    const alpha = new Student();
    alpha.setName('Smith');
    myclass.addStudent(Smith);

    assert.strictEqual(myclass.getStudentById(10), null);
    assert.strictEqual(myclass.getStudentById(0), Smith);
    assert.strictEqual(myclass.getStudentById("Smith"), undefined);
    assert.strictEqual(myclass.getStudentById(-1), null);
});

test("Test Student's setName", () => {
    // TODO
    throw new Error("Test not implemented");
    const beta = new Student();

    beta.setName(123);
    assert.strictEqual(beta.name, undefined);

    beta.setName("Jerry");
    assert.strictEqual(beta.name, "Jerry");
});

test("Test Student's getName", () => {
    // TODO
    throw new Error("Test not implemented");
});
    const gama = new Student();

    assert.strictEqual(gama.getName(), "");

    gama.setName("Ron");
    assert.strictEqual(gama.getName(), "Ron");
});