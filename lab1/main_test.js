const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

test("Test MyClass's addStudent", () => {
    const myClass = new MyClass();
    const student = new Student("John");
    myClass.addStudent(student);
    assert.strictEqual(myClass.students.length, 1);
});

test("Test MyClass's getStudentById", () => {
    const myClass = new MyClass();
    const student = new Student("Jane");
    myClass.addStudent(student);
    const retrievedStudent = myClass.getStudentById(student.id);
    assert.strictEqual(retrievedStudent, student);
});

test("Test Student's setName", () => {
    const student = new Student("Tom");
    student.setName("Jerry");
    assert.strictEqual(student.getName(), "Jerry");
});

test("Test Student's getName", () => {
    const student = new Student("Alice");
    assert.strictEqual(student.getName(), "Alice");
});
