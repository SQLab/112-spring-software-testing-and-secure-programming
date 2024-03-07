const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

// Test MyClass addStudent functionality
test('Test MyClass addStudent', () => {
  const myClass = new MyClass();
  const student = new Student();
  student.setName('John Doe');
  const newStudentId = myClass.addStudent(student);
  assert.ok(newStudentId > -1, 'Student ID should be a positive number');

  // Test adding null or undefined student
  //assert.throws(() => myClass.addStudent(null), Error, 'Adding null student should throw an error');
  //assert.throws(() => myClass.addStudent(undefined), Error, 'Adding undefined student should throw an error');
});

// Test MyClass getStudentById functionality
test('Test MyClass getStudentById', () => {
  const myClass = new MyClass();
  const student = new Student();
  student.setName('Jane Smith');
  const newStudentId = myClass.addStudent(student);
  const retrievedStudent = myClass.getStudentById(newStudentId);
  assert.strictEqual(retrievedStudent.getName(), 'Jane Smith', 'Retrieved student name should match');

  // Test getting an invalid student ID
  //assert.throws(() => myClass.getStudentById(-1), Error, 'Getting a student with an invalid ID should throw an error');
  //assert.throws(() => myClass.getStudentById(0), Error, 'Getting a student with an invalid ID should throw an error');
});

// Test Student setName functionality
test('Test Student setName', () => {
  const student = new Student();
  student.setName('Alice');
  assert.strictEqual(student.getName(), 'Alice', 'Student name should be set correctly');

  // Test setting an empty name
  student.setName('');
  assert.strictEqual(student.getName(), '', 'Student name should be set to an empty string');

  // Test setting null or undefined name
  //assert.throws(() => student.setName(null), Error, 'Setting null name should throw an error');
  //assert.throws(() => student.setName(undefined), Error, 'Setting undefined name should throw an error');
});

// Test Student getName functionality
test('Test Student getName', () => {
  const student = new Student();
  student.setName('Bob');
  assert.strictEqual(student.getName(), 'Bob', 'Student name should be retrieved correctly');

  // Test getting the name of a student without a name set
  const studentWithoutName = new Student();
  assert.strictEqual(studentWithoutName.getName(), '', 'Student name should be an empty string if not set');
});