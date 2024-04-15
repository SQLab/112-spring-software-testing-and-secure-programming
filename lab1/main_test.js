const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

test("Test MyClass's addStudent", () => {
    // TODO
    const myClass = new MyClass();
    const student = new Student();

    student.setName("John");

    assert.strictEqual(myClass.addStudent(student), 0);
    assert.strictEqual(myClass.addStudent("student"), -1);

    
});

test("Test MyClass's getStudentById", () => {
    // TODO
    const myClass = new MyClass();
    const student = new Student();

    student.setName("Jane");

    assert.strictEqual(myClass.addStudent(student), 0);
    assert.strictEqual(myClass.getStudentById(0), myClass.students[0]);

    assert.ifError(myClass.getStudentById(1));
    assert.ifError(myClass.getStudentById(-3));

    
});

test("Test Student's setName", () => {
    // TODO
    const student = new Student();
    student.setName("Doe");

    assert.strictEqual(student.name,"Doe");

    const student1 = new Student();
    student1.setName(1234);

    assert.strictEqual(student1.name,undefined);
    
    
});

test("Test Student's getName", () => {
    // TODO
    const student = new Student();
    student.setName("Smith");
    assert.strictEqual(student.getName(),"Smith");

    const student1 = new Student();
    assert.strictEqual(student1.getName(),"");
    
    
});