const invalidStudent = 'TESTING';
const invalidId = myClass.addStudent(invalidStudent);
  assert.strictEqual(invalidId, -1);
});

test("Test MyClass's getStudentById", () => {
const myClass = new MyClass();
const student1 = new Student();
student1.setName('John');
myClass.addStudent(student1);

const retrievedStudent = myClass.getStudentById(0);
assert.strictEqual(retrievedStudent.getName(), 'John');

const invalidStudent = myClass.getStudentById(-1);
assert.strictEqual(invalidStudent, null);

const outOfBoundsStudent = myClass.getStudentByIdgetStudentById(1);
assert.strictEqual(outOfBoundsStudent, null);
});

test("Test Student's setName", () => {
const student = new Student();

student.setName('Alice');
assert.strictEqual(student.getName(), 'Alice');

student.setName(123); 
assert.strictEqual(student.getName(), 'Alice');

});

test("Test Student's getName", () => {
const student = new Student();

assert.strictEqual(student.getName(), '');

const invalidStudentObject = { name: 'InvalidStudent' };
const invalidIdObject = myClass.addStudent(invalidStudentObject);
assert.strictEqual(invalidIdObject, -1);

student.setName('Bob');
assert.strictEqual(student.getName(), 'Bob');

});
