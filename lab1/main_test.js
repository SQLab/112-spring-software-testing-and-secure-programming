const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

test("Test MyClass's addStudent", () => {
    const myClass = new MyClass();
    const student = new Student();
    student.setName("John");
    const index = myClass.addStudent(student);
    assert.strictEqual(index, 0, "addStudent should return index 0 for the first student");
    const notAStudent = {}; 
    const indexForNotAStudent = myClass.addStudent(notAStudent);
    assert.strictEqual(indexForNotAStudent, -1, "addStudent should return -1 when adding a non-Student instance");
});

test("Test MyClass's getStudentById", () => {
    const myClass = new MyClass();
    const student = new Student();
    student.setName("Jane");
    const index = myClass.addStudent(student);
    const fetchedStudent = myClass.getStudentById(index);
    assert.strictEqual(fetchedStudent.getName(), "Jane", "getStudentById should retrieve the student with the correct name");
    const invalidFetchedStudent = myClass.getStudentById(-1);
    assert.strictEqual(invalidFetchedStudent, null, "getStudentById should return null for an invalid id");
});

test("Test Student's setName", () => {
    const student = new Student();
    student.setName("Doe");
    assert.strictEqual(student.name, "Doe", "setName should correctly set the student's name");
    student.setName(123); 
    assert.strictEqual(student.name, "Doe", "setName should not set name when the input is not a string");
});

test("Test Student's getName", () => {
    const student = new Student();
    student.setName("Smith");
    assert.strictEqual(student.getName(), "Smith", "getName should return the correct name");
    const newStudent = new Student();
    assert.strictEqual(newStudent.getName(), '', "getName should return an empty string for a student without a name");
});
