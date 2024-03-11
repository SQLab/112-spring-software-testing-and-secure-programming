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
  //新增兩個有效的student，測試是否正確

  const invalidStudent = 'TESTING';
  const invalidId = myClass.addStudent(invalidStudent);
  assert.strictEqual(invalidId, -1);
  //新增無效的student，應返回-1

  const invalidStudentObject = { name: 'InvalidStudent' };
  const invalidIdObject = myClass.addStudent(invalidStudentObject);
  assert.strictEqual(invalidIdObject, -1);
  //新增非Student對象，應返回-1
});
