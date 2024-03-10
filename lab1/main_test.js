const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

test("Test MyClass's addStudent" , async () =>{
   const myClass = new MyClass();
   const student = new Student();
   student.setName("Tingegg");
   const index = myClass.addStudent(student);
   assert.strictEqual(myClass.students.includes(student), true);
   assert.strictEqual(index, 0); 

   const faultresult = myClass.addStudent("NotAStudent");
   assert.strictEqual(faultresult, -1); 

});

test("Test MyClass's getStudentById", async () => {
   const myClass = new MyClass();
   const student = new Student();
   student.setName("Bob");
   const index = myClass.addStudent(student);
   const foundStudent = myClass.getStudentById(index);
   assert.strictEqual(foundStudent, student);

   const faultfoundStudent = myClass.getStudentById(999); 
   assert.strictEqual(faultfoundStudent, null); 

});

test("Test Student's setName", async () => {
   const student = new Student();
   student.setName("Charlie");
   assert.strictEqual(student.getName(), "Charlie");
   student.setName(null);
   assert.strictEqual(student.getName(), ''); 
});

test("Test Student's getName", async () => {
   const myClass = new MyClass();
   const student = new Student();
   student.setName("David");
   assert.strictEqual(student.getName(), "David");
   student.setName("Eve");
   await myClass.addStudent(student);
   assert.strictEqual(myClass.students.length, 1); 
});

