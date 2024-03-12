const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

test("Test MyClass's addStudent", () => {
    const myClass = new MyClass();
    const student = new Student();

    // Test adding a valid student
    assert.strictEqual(myClass.addStudent(student), 0);

    // Test adding an invalid student
    assert.strictEqual(myClass.addStudent("not a student"), -1);
});

test("Test MyClass's getStudentById", () => {
    const myClass = new MyClass();
    const student = new Student();
    myClass.addStudent(student);

    // Test getting a student by valid id
    assert.strictEqual(myClass.getStudentById(0), student);

    // Test getting a student by invalid id
    assert.strictEqual(myClass.getStudentById(-1), null);
    assert.strictEqual(myClass.getStudentById(100), null);
});

test("Test Student's setName", () => {
    const student = new Student();

    // Test setting a valid name
    student.setName("Alice");
    assert.strictEqual(student.getName(), "Alice");

    // Test setting an invalid name
    student.setName(123);
    assert.strictEqual(student.getName(), "Alice");
});

test("Test Student's getName", () => {
    const student = new Student();

    // Test name before setting
    assert.strictEqual(student.getName(), '');

    // Test name after setting
    student.setName("Bob");
    assert.strictEqual(student.getName(), "Bob");
});

