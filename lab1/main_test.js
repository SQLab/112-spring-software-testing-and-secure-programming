const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

test("Test MyClass's addStudent", () => {
    const myClass = new MyClass();
    const student = new Student();
    
    // Adding a valid student
    const validStudentId = myClass.addStudent(student);
    assert.strictEqual(validStudentId, 0);

    // Adding an invalid student
    const invalidStudentId = myClass.addStudent({});
    assert.strictEqual(invalidStudentId, -1);
    throw new Error("Test not implemented");
});

test("Test MyClass's getStudentById", () => {
    const myClass = new MyClass();
    const student1 = new Student();
    const student2 = new Student();
    student1.setName('John');
    student2.setName('Jane');
    myClass.addStudent(student1);
    myClass.addStudent(student2);

    // Getting an existing student
    const existingStudent = myClass.getStudentById(1);
    assert.strictEqual(existingStudent.getName(), 'Jane');

    // Getting a non-existing student
    const nonExistingStudent = myClass.getStudentById(2);
    assert.strictEqual(nonExistingStudent, null);
throw new Error("Test not implemented");
});

test("Test Student's setName", () => {
    const student = new Student();
    
    // Setting a valid name
    student.setName('John');
    assert.strictEqual(student.getName(), 'John');

    // Setting an invalid name
    student.setName(123); // Setting a non-string name
    assert.strictEqual(student.getName(), ''); // Name should remain unchanged
throw new Error("Test not implemented");
});


test("Test Student's getName", () => {
    const student = new Student();

    // Getting name when it's not set
    assert.strictEqual(student.getName(), '');

    // Getting name after setting it
    student.setName('Jane');
    assert.strictEqual(student.getName(), 'Jane');
throw new Error("Test not implemented");
});

