const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

test("Test MyClass's addStudent", () => {
    const myClass = new MyClass();
    const student = new Student();
    student.setName('John');
    const result = myClass.addStudent(student);
    assert.strictEqual(result, 0, "Student should be added successfully");
});

test("Test MyClass's getStudentById", () => {
    const myClass = new MyClass();
    const student = new Student();
    student.setName('Jane');
    myClass.addStudent(student);
    const retrievedStudent = myClass.getStudentById(0);
    assert.strictEqual(retrievedStudent.getName(), 'Jane', "Retrieved student name should be 'Jane'");
});

test("Test Student's setName", () => {
    const student = new Student();
    student.setName('Doe');
    assert.strictEqual(student.getName(), 'Doe', "Student name should be 'Doe'");
});

test("Test Student's getName", () => {
    const student = new Student();
    assert.strictEqual(student.getName(), '', "Student name should be an empty string initially");
});
