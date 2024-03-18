const { MyClass, Student } = require('./main');

test("Test MyClass's addStudent", () => {
    // TODO
    throw new Error("Test not implemented");
  const myClass = new MyClass();

  const student1 = new Student();
  student1.setName('Smith');
  const id1 = myClass.addStudent(student1);
  assert.strictEqual(id1, 0);

  const student2 = new Student();
  student2.setName('Jane');
  const id2 = myClass.addStudent(student2);
  assert.strictEqual(id2, 1);

  const invalidStudent = 'TESTING';
  const invalidId = myClass.addStudent(invalidStudent);
  assert.strictEqual(invalidId, -1);

});

test("Test MyClass's getStudentById", () => {
    // TODO
    throw new Error("Test not implemented");
  const myClass = new MyClass();
  const student1 = new Student();
  student1.setName('Smith');
  myClass.addStudent(student1);

  const retrievedStudent = myClass.getStudentById(0);
  assert.strictEqual(retrievedStudent.getName(), 'Smith');

  const invalidStudent = myClass.getStudentById(-1);
  assert.strictEqual(invalidStudent, null);

  const outOfBoundsStudent = myClass.getStudentById(1);
  assert.strictEqual(outOfBoundsStudent, null);

});

test("Test Student's setName", () => {
    // TODO
    throw new Error("Test not implemented");
  const student = new Student();
  
  student.setName('Ron');
  assert.strictEqual(student.getName(), 'Ron');

  student.setName(123); 
  assert.strictEqual(student.getName(), 'Ron');

});

test("Test Student's getName", () => {
    // TODO
    throw new Error("Test not implemented");
});
  const student = new Student();

  assert.strictEqual(student.getName(), '');

  student.setName('Jerry');
  assert.strictEqual(student.getName(), 'Jerry');

});