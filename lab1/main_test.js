const assert = require('assert');
const { MyClass, Student } = require('./main');

test("Test MyClass's addStudent", () => {
    // TODO
    throw new Error("Test not implemented");
    const myClass = new MyClass();
    const student = new Student();
    const newStudentId = myClass.addStudent(student);
    assert.strictEqual(newStudentId, 0);
    assert.strictEqual(myClass.addStudent('not a student'), -1);
});

test("Test MyClass's getStudentById", () => {
    // TODO
    throw new Error("Test not implemented");
    const myClass = new MyClass();
    const student = new Student();
    myClass.addStudent(student);
    assert.strictEqual(myClass.getStudentById(0), student);
    assert.strictEqual(myClass.getStudentById(999), null);
});

test("Test Student's setName", () => {
    // TODO
    throw new Error("Test not implemented");
    const student = new Student();
    student.setName('John');
    assert.strictEqual(student.getName(), 'John');
    student.setName(123);
    assert.strictEqual(student.getName(), 'John'); 
});

test("Test Student's getName", () => {
    // TODO
    throw new Error("Test not implemented");
    const student = new Student();
    assert.strictEqual(student.getName(), '');
    student.setName('John');
    assert.strictEqual(student.getName(), 'John');
});
    
