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
  //新增無效的student
});

test("Test MyClass's getStudentById", () => {
  const myClass = new MyClass();
  const student1 = new Student();
  student1.setName('John');
  myClass.addStudent(student1);
  //添加一個student

  const retrievedStudent = myClass.getStudentById(0);
  assert.strictEqual(retrievedStudent.getName(), 'John');
  //對應ID

  const invalidStudent = myClass.getStudentById(-1);
  assert.strictEqual(invalidStudent, null);
  //無效ID

  const outOfBoundsStudent = myClass.getStudentById(1);
  assert.strictEqual(outOfBoundsStudent, null);
  //越界ID
});

test("Test Student's setName", () => {
  const student = new Student();

  student.setName('Alice');
  assert.strictEqual(student.getName(), 'Alice');
  //測試有效名稱

  student.setName(123); 
  assert.strictEqual(student.getName(), 'Alice');
  //測試非字串

});

test("Test Student's getName", () => {
  const student = new Student();

  assert.strictEqual(student.getName(), '');
  //初始化，未設置應返回空

  student.setName('Bob');
  assert.strictEqual(student.getName(), 'Bob');
  //設置後正確返回
});
