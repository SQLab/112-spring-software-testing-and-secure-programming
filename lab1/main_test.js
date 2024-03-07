const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

const myClass = new MyClass();
const studentId = 1;

test("Test MyClass's addStudent", () => {
    
    
    const names = ['John', 'Jane', 'Doe', 'Smith'];
    names.forEach(name => {
    const student = new Student();
    student.setName(name);
    const newStudentId = myClass.addStudent(student);
    const newStudentName = myClass.getStudentById(newStudentId).getName();
    console.log('[+] Added student with id: %d, name: %s', newStudentId, newStudentName);
    });
});

test("Test MyClass's getStudentById", () => {
    
    const StudentName = myClass.getStudentById(studentId).getName();
    console.log('[+] Get student with id: %d, name: %s', 1, StudentName);
    
});

test("Test Student's setName", () => {
    const newStudentName = "Jimmy";
    myClass.getStudentById(1).setName(newStudentName);
    console.log('[+] Set student name: %s', newStudentName);
});

test("Test Student's getName", () => {
    const studentName = myClass.getStudentById(1).getName();
    console.log('[+] Get student name: %s', studentName);
});