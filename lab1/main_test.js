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
    assert.strictEqual(student.getName(), 'Doe');
    student.setName(123);
    assert.strictEqual(student.getName(), 'Doe'); 
});

test("Test Student's getName", () => {
    // TODO
    const student = new Student();
    assert.strictEqual(student.getName(), '');
    student.setName('Alice');
    assert.strictEqual(student.getName(), 'Smith');
});

test("Test MyClass's addStudent with non-Student object", () => {
    const myClass = new MyClass();
    const nonStudent = { name: 'Doe' };
    const index = myClass.addStudent(nonStudent);
    assert.strictEqual(index, -1);
    assert.strictEqual(myClass.students.length, 0);
});

test("Test MyClass's getStudentById with invalid id", () => {
    const myClass = new MyClass();
    const student = new Student();
    student.setName('John');
    myClass.addStudent(student);
    const retrievedStudent = myClass.getStudentById(1);
    assert.strictEqual(retrievedStudent, null);
    
