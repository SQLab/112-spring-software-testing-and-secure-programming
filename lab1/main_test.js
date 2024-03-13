const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

test("Test MyClass's addStudent", () => {
    // TODO
    const myClass = new MyClass();
    const student = new Student();

    student.setName("Jack");

    assert.strictEqual(myClass.addStudent(student), 0);
    assert.strictEqual(myClass.addStudent("student"), -1);

    throw new Error("Test not implemented");
});

test("Test MyClass's getStudentById", () => {
    // TODO
    const myClass = new MyClass();
    const student = new Student();

    student.setName("Rose");

    assert.strictEqual(myClass.addStudent(student), 0);
    assert.strictEqual(myClass.getStudentById(0), myClass.students[0]);

    assert.ifError(myClass.getStudentById(1));
    assert.ifError(myClass.getStudentById(-3));

    throw new Error("Test not implemented");
});

test("Test Student's setName", () => {
    // TODO
    const student = new Student();
    student.setName("Peter");

    assert.strictEqual(student.name,"Peter");

    const student1 = new Student();
    student1.setName(123456789);

    assert.strictEqual(student1.name,undefined);
    
    throw new Error("Test not implemented");
});

test("Test Student's getName", () => {
    // TODO
    const student = new Student();
    student.setName("Alice");
    assert.strictEqual(student.getName(),"Alice");

    const student1 = new Student();
    assert.strictEqual(student1.getName(),"");
    
    throw new Error("Test not implemented");
});