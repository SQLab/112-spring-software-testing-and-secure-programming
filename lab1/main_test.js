const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

test("Test MyClass's addStudent", async (t) => {
    const myClass = new MyClass();
    const student = new Student();
    student.setName("John Doe");
    
    const index = myClass.addStudent(student);
    assert.strictEqual(index, 0); // 應該返回索引0

    const nonStudent = {};
    const nonStudentIndex = myClass.addStudent(nonStudent);
    assert.strictEqual(nonStudentIndex, -1); // 添加非Student對象，應返回-1
});

test("Test MyClass's getStudentById", async (t) => {
    const myClass = new MyClass();
    const student = new Student();
    student.setName("Jane Doe");
    myClass.addStudent(student);
    
    const fetchedStudent = myClass.getStudentById(0);
    assert.strictEqual(fetchedStudent.getName(), "Jane Doe"); // 確認可以通過ID獲取學生

    const invalidStudent = myClass.getStudentById(999);
    assert.strictEqual(invalidStudent, null); // 使用無效ID應返回null
});

test("Test Student's setName and getName", async (t) => {
    const student = new Student();
    student.setName("John Doe");
    assert.strictEqual(student.getName(), "John Doe"); // 檢查setName和getName功能

    student.setName(123); // 嘗試使用非字符串設置名字
    assert.strictEqual(student.getName(), "John Doe"); // 名字不應該改變
});
