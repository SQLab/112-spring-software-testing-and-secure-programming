const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

    // Test adding a valid student
    const myClass = new MyClass();
    const student1 = new Student();
    assert.strictEqual(myClass.addStudent(student1), 0);
    assert.strictEqual(myClass.students.length, 1);
    assert.strictEqual(myClass.students[0], student1);

    // Test adding another valid student
    const student2 = new Student();
    assert.strictEqual(myClass.addStudent(student2), 1);
    assert.strictEqual(myClass.students.length, 2);
    assert.strictEqual(myClass.students[1], student2);

    // Test adding an invalid student
    assert.strictEqual(myClass.addStudent({}), -1);
    assert.strictEqual(myClass.students.length, 2); // Should not add invalid student
});

test("Test MyClass's getStudentById", () => {
    // Test getting student by valid id
    const myClass = new MyClass();
    const student1 = new Student();
    const student2 = new Student();

    myClass.addStudent(student1);
    myClass.addStudent(student2);

    assert.strictEqual(myClass.getStudentById(0), student1);
    assert.strictEqual(myClass.getStudentById(1), student2);

    // Test getting student by invalid id
    assert.strictEqual(myClass.getStudentById(-1), null);
    assert.strictEqual(myClass.getStudentById(2), null);
});

test("Test Student's setName", () => {
    // Test setting valid name
    const student = new Student();
    student.setName("CHINA");
    assert.strictEqual(student.name, "CHINA");

    // Test setting invalid name
    student.setName(8081);
    assert.strictEqual(student.name, "CHINA"); // Should not change name if invalid
});

test("Test Student's getName", () => {
    // Test getting name when name is not set
    const student = new Student();
    assert.strictEqual(student.getName(), "");

    // Test getting name when name is set
    student.setName("CUBA");
    assert.strictEqual(student.getName(), "CUBA");
});
