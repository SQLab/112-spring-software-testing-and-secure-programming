const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

test("Test MyClass's addStudent", () => {
    // TODO
    const myClass = new MyClass();
    const student = new Student();
    const newStudentId = myClass.addStudent(student);
    assert.strictEqual(newStudentId, 0);
    assert.strictEqual(myClass.addStudent('not a student'), -1);
});

test("Test MyClass's getStudentById", () => {
    // TODO
    const myClass = new MyClass();
    const student = new Student();
    myClass.addStudent(student);
    assert.strictEqual(myClass.getStudentById(0), student);
    assert.strictEqual(myClass.getStudentById(999), null);
});

test("Test Student's setName", () => {
    // TODO
    student.setName('Alice');
    assert.strictEqual(student.getName(), 'Alice');
    student.setName(123);
    assert.strictEqual(student.getName(), 'Alice'); 
});

test("Test Student's getName", () => {
    // TODO
    const student = new Student();
    assert.strictEqual(student.getName(), '');
    student.setName('Alice');
    assert.strictEqual(student.getName(), 'Alice');
});
