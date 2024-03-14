const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

test("Test MyClass's addStudent", () => {
    const myClass = new MyClass();
    const student = new Student();
    student.setName("Guan")

    const stuid = myClass.addStudent(student);
    assert.strictEqual(stuid,0)
    const nostudent = myClass.addStudent("CHEN");
    assert.strictEqual(nostudent,-1)
});

test("Test MyClass's getStudentById", () => {
    const myClass = new MyClass();
    const student = new Student();
    student.setName("Guan")
    const stuid = myClass.addStudent(student);
    const getstuid = myClass.getStudentById(stuid)
    assert.strictEqual(getstuid,student)
    assert.strictEqual(myClass.getStudentById(-1),null)
});

test("Test Student's setName", () => {
    const student = new Student();
    student.setName("Guan")
    student.setName(123)
    
    assert.strictEqual(student.getName(),"Guan")
});

test("Test Student's getName", () => {
    const student = new Student();
    assert.strictEqual(student.getName(),"")
});