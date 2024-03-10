const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

// 测试 MyClass 的 addStudent 方法
test("Test MyClass's addStudent", async () => {
    const myClass = new MyClass();
    const student = new Student();
    student.setName("Alice");
    const index = myClass.addStudent(student);
    assert.strictEqual(myClass.students.includes(student), true);
    assert.strictEqual(index, 0); // 假设这是第一个学生，所以索引是0
});

// 测试 MyClass 的 getStudentById 方法
test("Test MyClass's getStudentById", async () => {
    const myClass = new MyClass();
    const student = new Student();
    student.setName("Bob");
    const index = myClass.addStudent(student);
    const foundStudent = myClass.getStudentById(index);
    assert.strictEqual(foundStudent, student);
});

// 测试 Student 的 setName 方法
test("Test Student's setName", async () => {
    const student = new Student();
    student.setName("Charlie");
    assert.strictEqual(student.getName(), "Charlie");
});

// 测试 Student 的 getName 方法
test("Test Student's getName", async () => {
    const student = new Student();
    student.setName("David");
    assert.strictEqual(student.getName(), "David");
});

// 添加对错误输入和边界条件的测试
// 这将帮助实现100%的测试覆盖率

// 测试 addStudent 对非 Student 输入的处理
test("Test MyClass's addStudent with non-Student input", async () => {
    const myClass = new MyClass();
    const result = myClass.addStudent("NotAStudent");
    assert.strictEqual(result, -1); // 假设非 Student 输入应返回 -1
});

// 测试 getStudentById 对无效 id 的处理
test("Test MyClass's getStudentById with invalid id", async () => {
    const myClass = new MyClass();
    const foundStudent = myClass.getStudentById(999); // 假设这是一个无效的id
    assert.strictEqual(foundStudent, null); // 假设无效 id 应返回 null
});

// 测试 setName 对非字符串输入的处理
test("Test Student's setName with non-string input", async () => {
    const student = new Student();
    student.setName(null);
    assert.strictEqual(student.getName(), ''); // 假设 setName 忽略非字符串，getName 返回默认值
});

// 确保所有测试都是异步的
test("Test async behavior", async () => {
    const myClass = new MyClass();
    const student = new Student();
    student.setName("Eve");
    await myClass.addStudent(student);
    assert.strictEqual(myClass.students.length, 1); // 检查学生已被添加
});


