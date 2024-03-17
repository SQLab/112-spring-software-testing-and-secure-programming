const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

test("Test MyClass's addStudent", () => {
  const myClass = new MyClass();
  const student1 = new Student();
  student1.setName('John');
  const id1 = myClass.addStudent(student1);
  assert.strictEqual(id1, 0);

  const student2 = new Student();
  student2.setName('Jane');
  const id2 = myClass.addStudent(student2);
  assert.strictEqual(id2, 1);
  // Add two valid students and test if the IDs are correct

  const invalidStudent = 'TESTING';
  const invalidId = myClass.addStudent(invalidStudent);
  assert.strictEqual(invalidId, -1);
  // Add an invalid student and test if the ID is -1
});

test("Test MyClass's getStudentById", () => {
  const myClass = new MyClass();
  const student1 = new Student();
  student1.setName('John');
  myClass.addStudent(student1);
  // Add a student

  const retrievedStudent = myClass.getStudentById(0);
  assert.strictEqual(retrievedStudent.getName(), 'John');
  // Match ID

  const invalidStudent = myClass.getStudentById(-1);
  assert.strictEqual(invalidStudent, null);
  // Invalid ID

  const outOfBoundsStudent = myClass.getStudentById(1);
  assert.strictEqual(outOfBoundsStudent, null);
  // Out-of-bounds ID
});

test("Test Student's setName", () => {
  const student = new Student();

  student.setName('Alice');
  assert.strictEqual(student.getName(), 'Alice');
  // Test with a valid name

  student.setName(123); 
  assert.strictEqual(student.getName(), 'Alice');
  // Test with a non-string input
});

test("Test Student's getName", () => {
  const student = new Student();

  assert.strictEqual(student.getName(), '');
  // Initialization, should return an empty string

  student.setName('Bob');
  assert.strictEqual(student.getName(), 'Bob');
  // After setting the name, should return 'Bob'
});
