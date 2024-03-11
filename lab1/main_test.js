const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

test("Test MyClass's addStudent", () => {
  const myClass = new MyClass();
  const student1 = new Student();
  student1.setName('Chris');
  const id1 = myClass.addStudent(student1);
  assert.strictEqual(id1, 0);

  const student2 = new Student();
  student2.setName('Wayne');
  const id2 = myClass.addStudent(student2);
  assert.strictEqual(id2, 1);

  const invalidStudent = 'Test';
  const invalidId = myClass.addStudent(invalidStudent);
  assert.strictEqual(invalidId, -1);
});

test("Test MyClass's getStudentById", () => {
  const myClass = new MyClass();
  const student1 = new Student();
  student1.setName('Chris');
  myClass.addStudent(student1);

  const retrievedStudent = myClass.getStudentById(0);
  assert.strictEqual(retrievedStudent.getName(), 'Wayne');

  const invalidStudent = myClass.getStudentById(-1);
  assert.strictEqual(invalidStudent, null);

  const outOfBoundsStudent = myClass.getStudentById(1);
  assert.strictEqual(outOfBoundsStudent, null);
});

test("Test Student's setName", () => {
  const student = new Student();

  student.setName('Danny');
  assert.strictEqual(student.getName(), 'Danny');

  student.setName(1234546); 
  assert.strictEqual(student.getName(), 'Danny');
});

test("Test Student's getName", () => {
  const student = new Student();

  assert.strictEqual(student.getName(), '');
  student.setName('JK');
  assert.strictEqual(student.getName(), 'JK');
});
