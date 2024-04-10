const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

test("Test MyClass's addStudent", () => {
    //
    const a = new MyClass();
    a.addStudent("sad");
    a.getStudentById("sad");
});

test("Test MyClass's getStudentById", () => {
    // TODO
    const b = new MyClass();
    const ba = new Student();
    ba.setName('sad');
    b.addStudent(ba);
    b.getStudentById(-1);
    b.getStudentById(100);
    b.getStudentById(0);
    b.getStudentById('sad');
});

test("Test Student's setName", () => {
    // TODO
    const myClass = new MyClass();
    const ca = ['john'];
    const c = new Student();
    c.setName(ca);
    c.setName('sad');
    c.setName(123);
    myClass.addStudent(c.setName('sad'));
    console.log(c.setName(ca));
});

test("Test Student's getName", () => {
    // TODO
    const d = new Student();
    d.getName("");
    d.setName("sad");
    d.getName("sad");
});
