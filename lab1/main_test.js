const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

test("Test MyClass's addStudent", () => {
    const myclass = new MyClass();
    const alpha = new Student();
    alpha.setName('alpha');

    // 1. 班上沒有學生。
    assert.strictEqual(myclass.students.length, 0);

    // 2. 若非從 Student 類型新增學生。
    assert.strictEqual(myclass.addStudent("student"), -1);

    // 3. 從 Student 類型新增學生。
    myclass.addStudent(alpha);
    assert.strictEqual(myclass.students.length, 1);
});

test("Test MyClass's getStudentById", () => {
    const myclass = new MyClass();
    const alpha = new Student();
    alpha.setName('alpha');
    myclass.addStudent(alpha);

    // 1. 學生不存在。
    assert.strictEqual(myclass.getStudentById(10), null);
    // 2. 學生存在。
    assert.strictEqual(myclass.getStudentById(0), alpha);
    // 3. ID 不是數字。
    assert.strictEqual(myclass.getStudentById("alpha"), undefined);
    // 4. ID 是負數。
    assert.strictEqual(myclass.getStudentById(-1), null);
});

test("Test Student's setName", () => {
    const beta = new Student();

    // 1. 名字不是字串。
    beta.setName(123);
    assert.strictEqual(beta.name, undefined);

    // 2. 名字是字串。
    beta.setName("beta");
    assert.strictEqual(beta.name, "beta");
});

test("Test Student's getName", () => {
    const gama = new Student();

    // 1. 名字未設定。
    assert.strictEqual(gama.getName(), "");

    // 2. 名字已設定。
    gama.setName("gama");
    assert.strictEqual(gama.getName(), "gama");
});
