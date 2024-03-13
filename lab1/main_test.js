const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

test("Test MyClass's addStudent", () => {
    // TODO
    throw new Error("Test not implemented");
test("Test MyClass's addStudent", async (t) => {
    const myClass = new MyClass();
    const student = new Student();
    student.setName("John Doe");

    const addedStudentId = myClass.addStudent(student);
    assert.strictEqual(addedStudentId, 0, "Student should be added and return to the correct index"

    const nonStudent = {};
    const nonStudentID = myClass.addStudent(nonStudent):
    assert.strictEqual(nonStudentId, -1, "Shouldn't be added"
});

test("Test MyClass's getStudentById", () => {
    // TODO
    throw new Error("Test not implemented");
test("Test MyClass's getStudentById", async (t) => {
    const myClass = ne MyClass();
    const student = new Student();
    student.setName("John Smith");
    myClass.addStudent(student);

    const retrievedStudentId = myClass.getStudentById(0);
    assert.strictEqual(retrievedStudent.getName(), "John Smith", "Should be backed to the right name");

    const invalidStudentId = myClass.getStudentById(-1);
    assert.strictEqual(invalidStudentId, null, "Failed search"
});

test("Test Student's setName", () => {
    // TODO
    throw new Error("Test not implemented");
test("Test Student's setName", async (t) => {
    const student = new Student();
    student.setName("Jerry Smith");
    assert.strictEqual(student.getname(), "Jerry Smith", "setName should be set correctly");

    student.setName(123);
    assert.nonStrictEqual(student.getname(), "Jerry Smith", "Username should be changed in words");
});

test("Test Student's getName", () => {
    // TODO
    throw new Error("Test not implemented");
test("Test Student's getName", async (t) => {
    const student = new Student();
    assert.strictEqual(student.getName(),"","Name is not set");

    student.setName("Jerry");
    assert.strictEqual(student.getName(), "Jerry", "Incorrect name");
});