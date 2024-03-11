const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

test("Test MyClass's constructor", () => {
    const myClass = new MyClass();
    assert.deepStrictEqual(myClass.students, []);
});

test("Test MyClass's addStudent with non-Student object", () => {
    const myClass = new MyClass();
    const nonStudent = {}; // 建立一個非 Student 類別的物件
    const result = myClass.addStudent(nonStudent);
    assert.strictEqual(result, -1);
    assert.strictEqual(myClass.students.length, 0); // 確保沒有任何學生被新增
});

test("Test MyClass's getStudentById with out-of-range id", () => {
    const myClass = new MyClass();
    const student = new Student();
    student.setName('John');
    myClass.addStudent(student);
    const result = myClass.getStudentById(1); // 使用超出範圍的 id
    assert.strictEqual(result, null);
});

test("Test Student's setName", () => {
    const student = new Student();
    student.setName('John');
    assert.strictEqual(student.getName(), 'John');
});

test("Test Student's getName when name is not set", () => {
    const student = new Student();
    assert.strictEqual(student.getName(), '');
});
