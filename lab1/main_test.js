const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');


test("Test MyClass's addStudent", () => {
    // TODO
    //throw new Error("Test not implemented");
    const myClass = new MyClass();
    const student = new Student();


    //!(student instanceof Student)
    const notAStudent = { name: "Rex" }
    const notAStudentInstance = myClass.addStudent(notAStudent);
    assert.strictEqual(notAStudentInstance, -1, "If it's not a Student instance, it should return -1.");

    // push result
    student.setName("Rex");
    const addStudentResult = myClass.addStudent(student);
    assert.strictEqual(myClass.students[0], student, "The student has not been added to the student list.");

    // return id
    assert.strictEqual(addStudentResult, 0, "Return wrong id.")
});

test("Test MyClass's getStudentById", () => {
    // TODO
    //throw new Error("Test not implemented");
    const myClass = new MyClass();
    const student1 = new Student();
    const student2 = new Student();
    student1.setName("Alice");
    student2.setName("Bob");
    myClass.addStudent(student1);
    myClass.addStudent(student2);


    // id < 0 
    assert.strictEqual(myClass.getStudentById(-1), null, "get(-1) should be null");

    // id >= this.students.length
    assert.strictEqual(myClass.getStudentById(2), null, "Out of range should be null");


    // return id
    assert.strictEqual(myClass.getStudentById(0), student1, "Abnormal return of ID value");
    assert.strictEqual(myClass.getStudentById(1), student2, "Abnormal return of ID value");

});

test("Test Student's setName", () => {
    // TODO
    //throw new Error("Test not implemented");
    const student = new Student();

    // return userName
    student.setName("Alice");
    assert.strictEqual(student.getName(), "Alice", "setName Fail");

    // typeof userName !== 'string'
    student.setName(123);
    assert.strictEqual(student.getName(), "Alice", "userName should not be changed to anything other than a String");
});

test("Test Student's getName", () => {
    // TODO
    //throw new Error("Test not implemented");

    // this.name === undefined
    const student = new Student();
    assert.strictEqual(student.getName(), "", "When the name is not set, it should return an empty string");

    // return name
    student.setName("Bob");
    assert.strictEqual(student.getName(), "Bob", "Get the incorrect name");

});