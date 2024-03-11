const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

test("Test MyClass's addStudent", () => {
    const myClass = new MyClass();
    const student = new Student();
    student.setName('John');

    const result = myClass.addStudent(student);

    assert.strictEqual(result, 0);
    assert.strictEqual(myClass.students.length, 1);
    assert.strictEqual(myClass.getStudentById(0), student);
});

test("Test MyClass's addStudent with non-Student object", () => {
    const myClass = new MyClass();
    const nonStudent = {}; // A non-Student object
    const result = myClass.addStudent(nonStudent);

    assert.strictEqual(result, -1);
    assert.strictEqual(myClass.students.length, 0);
});

test("Test MyClass's getStudentById", () => {
    const myClass = new MyClass();
    const student1 = new Student();
    const student2 = new Student();
    student1.setName('John');
    student2.setName('Jane');
    myClass.addStudent(student1);
    myClass.addStudent(student2);

    assert.strictEqual(myClass.getStudentById(0), student1);
    assert.strictEqual(myClass.getStudentById(1), student2);
    assert.strictEqual(myClass.getStudentById(2), null);
});
