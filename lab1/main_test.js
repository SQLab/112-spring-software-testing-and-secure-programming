const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

test("Test MyClass's addStudent", async (t) => {
    const myClass = new MyClass();
    const student = new Student();
    student.setName("王小明");
    const index = myClass.addStudent(student);
    assert.strictEqual(index, 0, "王小明增加成功"); // 增加學生王小明有成功的話，return index = 0

    const nonStudentClass = ["我不是學生的類"]; // 增加一個不是學生的東西
    const StudentId = myClass.addStudent(nonStudentClass);
    assert.strictEqual(StudentId, -1, "學生增加失敗");

});

test("Test MyClass's getStudentById", async (t) => {
    const myClass = new MyClass();
    const student = new Student();
    student.setName("王小明");
    myClass.addStudent(student);
    const retrievedStudent = myClass.getStudentById(0);
    assert.strictEqual(retrievedStudent.getName(), "王小明", "學生名字 return 正確"); // 是否能在 index = 0，找到王小明

    const invalidStudent = myClass.getStudentById(-1);
    assert.strictEqual(invalidStudent, null, "錯誤的索引值"); // 因為索引從 0 開始 -1 是錯的
});

test("Test Student's setName", async (t) => {
    const student = new Student();
    student.setName("王小明");
    assert.strictEqual(student.name, "王小明", "名字正確記錄在物件"); // setName 有沒有在 student 物件成功附加上王小明，這個 name 屬性

    student.setName(511559027); // 不用 string 測試 setName
    assert.notStrictEqual(student.name, 511559027, "你就不是 string 還想幹嘛？");
});

test("Test Student's getName", async (t) => {
    const student = new Student();
    assert.strictEqual(student.getName(), '', "還沒有名稱， return 空 "); // getName 方法是否正確的 return 王小明這個名字

    student.setName("王小明");
    assert.strictEqual(student.getName(), "王小明", "正確 return 學生名稱");

});
