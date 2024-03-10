const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

test("Test MyClass's addStudent", async (t) => {
    const myClass = new MyClass();
    const student = new Student();
    student.setName("王小明");
    const index = myClass.addStudent(student);
    assert.strictEqual(index, 0); // 增加學生王小明有成功的話，return index = 0
});

test("Test MyClass's getStudentById", async (t) => {
    const myClass = new MyClass();
    const student = new Student();
    student.setName("王小明");
    myClass.addStudent(student);
    const retrievedStudent = myClass.getStudentById(0);
    assert.strictEqual(retrievedStudent.getName(), "王小明"); // 是否能在 index = 0，找到王小明
});

test("Test Student's setName", async (t) => {
    const student = new Student();
    student.setName("王小明");
    assert.strictEqual(student.name, "王小明"); // setName 有沒有在 student 物件成功附加上王小明，這個 name 屬性
});

test("Test Student's getName", async (t) => {
    const student = new Student();
    student.setName("王小明");
    assert.strictEqual(student.getName(), "王小明"); // getName 方法是否正確的 return 王小明這個名字
});
