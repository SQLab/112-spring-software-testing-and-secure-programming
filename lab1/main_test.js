const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

// Test MyClass addStudent functionality
test('Test MyClass addStudent', () => {
   const myClass = new MyClass();
   const student = new Student();
 
  //check if student is instance of Student
  const notAStudent = 123
  const notAStudentInstance = myClass.addStudent(notAStudent);
  assert.strictEqual(notAStudentInstance, -1, "If it's not a Student instance, it should return -1.");
 
  // push student to Student list
  student.setName("Joy");
  const addStudentResult = myClass.addStudent(student);
  assert.strictEqual(myClass.students[0], student, "The student has not been added to the student list. Add success");
 
  // return id
  assert.strictEqual(addStudentResult, 0, "Id should be 0 or positive number.")
 });
 
 // Test MyClass getStudentById functionality
 test('Test MyClass getStudentById', () => {
   const myClass = new MyClass();
   const student = new Student();
   student.setName('Tiffany');
   myClass.addStudent(student);
   
   // Id is negative number
   assert.strictEqual(myClass.getStudentById(-1), null, "Id should not be negative number, otherwise it will return null");
 
   // Id is not exist
   assert.strictEqual(myClass.getStudentById(myClass.students.length+1), null,  "Id is not exist");
 
   // student exist
   assert.strictEqual(myClass.getStudentById(0), student, "return student object");
 
 });
 
 // Test Student setName functionality
 test('Test Student setName', () => {
   const student1 = new Student();
   const student2 = new Student();
 
   // pass a value to setName that is a string type
   student1.setName('Alice');
   assert.strictEqual(student1.getName(), 'Alice', 'Student name set correctly');
 
   // pass a value to setName that is not a string type
   student2.setName(123);
     assert.strictEqual(student2.getName(), '', "userName should be in type of a string value");
 
   
 });
 
 // Test Student getName functionality
 test('Test Student getName', () => {
   const student = new Student();
 
   // Test getting the name of a student without setting a name
   assert.strictEqual(student.getName(), '', 'Student name should be an empty string if not set');
 
   // Test after set a name to student can return name
   student.setName('Bob');
   assert.strictEqual(student.getName(), 'Bob', 'Student name retrieved correctly');
 
   
 });