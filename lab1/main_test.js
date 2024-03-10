const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

test("Test MyClass's addStudent", () => {
   const myClass = new MyClass();
   const student = new Student();
   student.setName("Tingegg");
   const index = myClass.addStudent(student);
   assert.strictEqual(myClass.students.includes(student), true);
   assert.strictEqual(index, 0); 

});

test("Test MyClass's getStudentById", () => {
    const myClass = new MyClass();
    const student1 = new Student();
    const student2 = new Student();
    student1.setName("YaYa");
    student2.setName("GaGa");
    myClass.addStudent(student1);
    myClass.addStudent(student2);
    const validStudent = myClass.getStudentById(1);
    const invalidStudent = myClass.getStudentById(2);
    assert.strictEqual(validStudent.getName(), "GaGa");
    assert.strictEqual(invalidStudent, null);

});

test("Test Student's setName", () => {
   const student = new Student();
   student.setName("SaSa");	
   assert.strictEqual(student.getName(), "SaSa");
   // throw new Error("Test not implemented");
});

test("Test Student's getName", () => {
    const student = new Student();
    const nameBefore = student.getName();
    student.setName("DaDa");
    const nameAfter = student.getName();
    assert.strictEqual(nameBefore, "");
    assert.strictEqual(nameAfter,"HaHa");	
  //  throw new Error("Test not implemented");
});

