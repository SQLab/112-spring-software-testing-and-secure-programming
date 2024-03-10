const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

test("test MyClass addStudent", async (t) => {
    const myClass = new MyClass();
    const student = new Student();
    student.setName("A");
    const index = myClass.addStudent(student);

    assert.strictEqual(myClass.students[index], student);


});

test("test MyClass getStudentById", async (t) => {
    const myClass = new MyClass();
    const student = new Student();
    student.setName("B");
    const index = myClass.addStudent(student);

    const foundStudent = myClass.getStudentById(index);
    assert.strictEqual(foundStudent, student);
});

test("test Student setName", async (t) => {
    const student = new Student();
    student.setName("A");

    assert.strictEqual(student.getName(), "A");
});

test("test Student getName", async (t) => {
    const student = new Student();
    student.setName("B");

    assert.strictEqual(student.getName(), "B");
});

