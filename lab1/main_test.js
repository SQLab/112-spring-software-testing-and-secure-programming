const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');
//建立 MyClass及Student

//test student
test("Test addStudent", () => {
    const myClass = new MyClass();
    const student = new Student();

    // add stduent return 0
    assert.strictEqual(myClass.addStudent(student), 0);

    // add no stduent return -1
    assert.strictEqual(myClass.addStudent("not a student"), -1);
});
//test get studentID

test("Test getStudentById", () => {
    const myClass = new MyClass();
    const student = new Student();
    myClass.addStudent(student);

    // get studentID 0 
    assert.strictEqual(myClass.getStudentById(0), student);

    // Test get studentID -1 and 50 return null
    assert.strictEqual(myClass.getStudentById(-1), null);
    assert.strictEqual(myClass.getStudentById(50), null);
});
test("Test Student's setName", () => {
    const student = new Student();
    // add student AA 
    student.setName("AA");
    assert.strictEqual(student.getName(), "AA");

    // add student 12345
    student.setName(12345);
    assert.strictEqual(student.getName(), "AA");
});
// add student Name
test("Test Student's getName", () => {
    const student = new Student();

    // NO add student return 
    assert.strictEqual(student.getName(), '');

    // add student BB test BB
    student.setName("BB");
    assert.strictEqual(student.getName(), "BB");
});

