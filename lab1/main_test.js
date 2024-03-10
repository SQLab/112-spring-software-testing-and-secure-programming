const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');


test("Test MyClass's addStudent", async () => {
    const myClass = new MyClass();
    const student = new Student();
    student.setName("Alice");
    const index = myClass.addStudent(student);
    assert.strictEqual(myClass.students.includes(student), true);
    assert.strictEqual(index, 0); 
});


test("Test MyClass's getStudentById", async () => {
    const myClass = new MyClass();
    const student = new Student();
    student.setName("Bob");
    const index = myClass.addStudent(student);
    const foundStudent = myClass.getStudentById(index);
    assert.strictEqual(foundStudent, student);
});


test("Test Student's setName", async () => {
    const student = new Student();
    student.setName("Charlie");
    assert.strictEqual(student.getName(), "Charlie");
});


test("Test Student's getName", async () => {
    const student = new Student();
    student.setName("David");
    assert.strictEqual(student.getName(), "David");
});


test("Test MyClass's addStudent with non-Student input", async () => {
    const myClass = new MyClass();
    const result = myClass.addStudent("NotAStudent");
    assert.strictEqual(result, -1); 
});

test("Test MyClass's getStudentById with invalid id", async () => {
    const myClass = new MyClass();
    const foundStudent = myClass.getStudentById(999); 
    assert.strictEqual(foundStudent, null); 
});


test("Test Student's setName with non-string input", async () => {
    const student = new Student();
    student.setName(null);
    assert.strictEqual(student.getName(), ''); 
});


test("Test async behavior", async () => {
    const myClass = new MyClass();
    const student = new Student();
    student.setName("Eve");
    await myClass.addStudent(student);
    assert.strictEqual(myClass.students.length, 1); 
});


