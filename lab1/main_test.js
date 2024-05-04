const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

const myclass = new MyClass();
const alpha = new Student();
alpha.setName('alpha');

test("Test MyClass's addStudent", () => {
    // TODO
    // 課堂上沒有人
    assert.strictEqual(myclass.students.length, 0);

    // 如果添加不是來自學生
    assert.strictEqual(myclass.addStudent("student"), -1);

    //  從學生加入學生
    myclass.addStudent(alpha);
    assert.strictEqual(myclass.students.length, 1);


    // throw new Error("Test not implemented");
});

test("Test MyClass's getStudentById", () => {
    // TODO

    // 學生不存在
    assert.strictEqual(myclass.getStudentById(10), null);

    // 學生存在
    assert.strictEqual(myclass.getStudentById(0), alpha);

    // ID 不是數字
    assert.strictEqual(myclass.getStudentById("alpha"), undefined);

    // id為負數
    assert.strictEqual(myclass.getStudentById(-1), null);


    //throw new Error("Test not implemented");
});

test("Test Student's setName", () => {
    // TODO
    let beta = new Student();

    // 名稱不是字串
    beta.setName(123);
    assert.strictEqual(beta.name, undefined);

    // 名稱是字串
    beta.setName("beta");
    assert.strictEqual(beta.name, "beta");

    //throw new Error("Test not implemented");
});

test("Test Student's getName", () => {
    // TODO
    
    let gama = new Student();
    // 名稱未設定
    assert.strictEqual(gama.getName(), "");

    // 名稱已設定
    gama.setName("gama");
    assert.strictEqual(gama.getName(), "gama");

    //throw new Error("Test not implemented");
});
