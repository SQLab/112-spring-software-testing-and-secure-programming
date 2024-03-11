const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');


test("Test MyClass's addStudent", () => {
    const myClass = new MyClass();
    const student = new Student();
    student.setName('John Doe');
    const index = myClass.addStudent(student);
    assert.strictEqual(index, 0); // 添加並返回索引 0

    const nonStudent = {}; // 非 Student 實例
    const wrongIndex = myClass.addStudent(nonStudent);
    assert.strictEqual(wrongIndex, -1); // 嘗試添加非 Student 實例應返回 -1
});

test("Test MyClass's getStudentById", () => {
    const myClass = new MyClass();
    const student = new Student();
    student.setName('Jane Doe');
    const index = myClass.addStudent(student);
    const retrievedStudent = myClass.getStudentById(index);
    assert.strictEqual(retrievedStudent, student); // 返回相同的學生實例

    const nullStudent = myClass.getStudentById(-1); // 錯誤的索引
    assert.strictEqual(nullStudent, null); // 返回 null

});

test("Test Student's setName", () => {
    const student = new Student();
    student.setName('John Doe');
    assert.strictEqual(student.getName(), 'John Doe'); // setName 後 getName 應該返回設置的名字

    student.setName(123); // 嘗試設置非字串
    assert.strictEqual(student.getName(), 'John Doe'); // 名字保持不變

});

test("Test Student's getName", () => {
    const student = new Student();
    assert.strictEqual(student.getName(), ''); // 如果名字未設置應返回空字串

    student.setName('Jane Doe');
    assert.strictEqual(student.getName(), 'Jane Doe'); // setName 後 getName 返回設置的名字

});
