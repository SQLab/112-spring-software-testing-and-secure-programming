const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

test("Test MyClass's addStudent", () => {
    const myClass = new MyClass();
    const student = new Student();
    student.setName("tingegg");
   //利用Student物件呼叫myClass的addStudent方法,並將回傳值寫在變數newStudentId中	
   const newStudentId = myClass.addStudent(student);

    //寫assertions確保addStudent回傳值,如果正確，myClass會包含新增的student
    assert.strictEqual(newStudentId, 0);
    assert.strictEqual(myClass.students.length, 1);
    assert.strictEqual(myClass.getStudentById(newStudentId).getName(), "tingegg");

   //利用faultStudent宣告非Student型別的物件
    const faultStudent = {};
    const result = myClass.addStudent(faultStudent);
    //寫assertions確認faultStudent回傳值為-1
    assert.strictEqual(result, -1);
    assert.strictEqual(myClass.students.length, 0,"student");	
   // throw new Error("Test not implemented");
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

    const 	
   // throw new Error("Test not implemented");
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

