const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');
//construct MyClass及Student

//test student
test("Test MyClass's addStudent", () => {
    const myClass = new MyClass();
    const student = new Student();

    // add >> return 0
    assert.strictEqual(myClass.addStudent(student), 0);

    // add not a stduent >>return -1
    assert.strictEqual(myClass.addStudent("not a student"), -1);
});
//test get studentID

test("Test MyClass's getStudentById", () => {
    const myClass = new MyClass();
    const student = new Student();
    myClass.addStudent(student);

    // get studentID 0 
    assert.strictEqual(myClass.getStudentById(0), student);

    // Test get studentID -1 and 100 return null
    assert.strictEqual(myClass.getStudentById(-1), null);
    assert.strictEqual(myClass.getStudentById(100), null);
});
// add student Name A
test("Test Student's setName", () => {
    const student = new Student();

    // add student Amy 
    student.setName("Amy");
    assert.strictEqual(student.getName(), "Amy");

    // add student Bob 
    student.setName("Bob");
    assert.strictEqual(student.getName(), "Amy");
});
// add student Name
test("Test Student's getName", () => {
    const student = new Student();

    // NO  student 
    assert.strictEqual(student.getName(), '');

    // add student Bob
    student.setName("Bob");
    assert.strictEqual(student.getName(), "Bob");
});


