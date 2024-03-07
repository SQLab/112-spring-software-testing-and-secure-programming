const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

//Test MyClass addStudent functionality
test('Test MyClass addStudent', () => {
  const myClass = new MyClass();
  const student = new Student();
  student.setName('John Doe');
  const newStudentId = myClass.addStudent(student);
  assert.ok(newStudentId > -1, 'Student ID should be a positive number');
});

//Test MyCLass getStudentById functionaliy
test('Test MyClasss getStudentById', () => {
  const myClass = new MyClass();
  const student = new Student();
  student.setName('Jane Smith');
  const newStudentId = myClass.addStudent(student);
  const retrievedStudent = myClass.getStudentById(newStudentId);
  assert.strictEqual(retrievedStudent.getName(), 'Jane Smith', 'Retrieved student name should match');
});
//Test Student setName functionality
test('Test Students setName', () => {
  const student = new Student();
  student.setName('Alice');
  assert.strictEqual(student.getName(), 'Alice', 'Student name should be set correctly');
});
//Test Student getName functionality
test('Test Students getName', () => {
  const student = new Student();
  student.setName('Bob');
  assert.strictEqual(student.getName(), 'Bob', 'Student name should be retrieved correctly');
});