const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

test("Test MyClass's addStudent", () => {
    const myClass = new MyClass();
    const student = new Student();
    student.setName('John Doe');
    const index = myClass.addStudent(student);
    assert.strictEqual(index, 0);

    const nonStudent = {};
    const wrongIndex = myClass.addStudent(nonStudent);
    assert.strictEqual(wrongIndex, -1);
});
test("Test MyClass's getStudentById", () => {
    const myClass = new MyClass();
    const student = new Student();
    student.setName('TestName');
    const index = myClass.addStudent(student);
    const retrievedStudent = myClass.getStudentById(index);
    assert.strictEqual(retrievedStudent, student);
    const nullStudent = myClass.getStudentById(-1);
    assert.strictEqual(nullStudent, null);
});
test("Test Student's setName", () => {
    const student = new Student();
    student.setName('TestName');
    assert.strictEqual(student.getName(), 'TestName');

    student.setName(14747146);
    assert.strictEqual(student.getName(), 'TestName');
});
test("Test Student's getName", () => {
    const student = new Student();
    assert.strictEqual(student.getName(), '');

    student.setName('TestName');
    assert.strictEqual(student.getName(), 'TestName');
