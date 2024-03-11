const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

test("Test MyClass's addStudent", () => {
    const myClass = new MyClass();
    const student = new Student("Alice");
    
    myClass.addStudent(student);
    
    assert.strictEqual(myClass.students.length, 1);
    assert.strictEqual(myClass.students[0], student);
});

test("Test MyClass's getStudentById", () => {
    const myClass = new MyClass();
    const student1 = new Student("Alice");
    const student2 = new Student("Bob");
    
    myClass.addStudent(student1);
    myClass.addStudent(student2);
    
    assert.strictEqual(myClass.getStudentById(1), student1);
    assert.strictEqual(myClass.getStudentById(2), student2);
    assert.strictEqual(myClass.getStudentById(3), undefined);
});

test("Test Student's setName", () => {
    const student = new Student("Alice");
    
    student.setName("Bob");
    
    assert.strictEqual(student.getName(), "Bob");
});

test("Test Student's getName", () => {
    const student = new Student("Alice");
    
    assert.strictEqual(student.getName(), "Alice");
});
