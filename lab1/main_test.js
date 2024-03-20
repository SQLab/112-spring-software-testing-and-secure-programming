const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

test("Test MyClass's addStudent", () => {
    const myClass = new MyClass();
    const student = new Student("John");
    myClass.addStudent(student);
    assert.strictEqual(myClass.students.length, 1);
    assert.strictEqual(myClass.students[0], student);
});

test("Test MyClass's getStudentById", () => {
    const myClass = new MyClass();
    const student1 = new Student("John");
    const student2 = new Student("Alice");
    myClass.addStudent(student1);
    myClass.addStudent(student2);
    const foundStudent = myClass.getStudentById(student2.id);
    assert.strictEqual(foundStudent, student2);
});

test("Test Student's setName", () => {
    const student = new Student("John");
    student.setName("Alice");
    assert.strictEqual(student.getName(), "Alice");
});

test("Test Student's getName", () => {
    const student = new Student("John");
    assert.strictEqual(student.getName(), "John");
});
