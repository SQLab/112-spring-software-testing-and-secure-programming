const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

test("Test MyClass's addStudent", () => {

        const myClass = new MyClass();
        const Jerry = new Student();
        Jerry.setName('Jerry')
        const result = myClass.addStudent(Jerry)
        assert.strictEqual(result,0)

        const  emptyStudent = myClass.addStudent(50.6)
        assert.strictEqual(emptyStudent,-1)

});

test("Test MyClass's getStudentById", () => {

        const myClass = new MyClass();
        const Jerry = new Student(); 
        Jerry.setName("Jerry")
        myClass.addStudent(Jerry)
        
        const retrieveStudent = myClass.getStudentById(0)
        assert.strictEqual(retrieveStudent,Jerry)

        const retrieveEmpty1 =  myClass.getStudentById(-1)
        assert.strictEqual(retrieveEmpty1,null)

        const retrieveEmpty2 =  myClass.getStudentById(1)
        assert.strictEqual(retrieveEmpty2,null)

});

test("Test Student's setName", () => {
    
        const student = new Student();

        student.setName(123)
        assert.strictEqual(student.name,undefined)

        student.setName("Jerry")
        assert.strictEqual(student.name,"Jerry")

});

test("Test Student's getName", () => {
    
        const student = new Student();
        assert.strictEqual(student.getName(),'')

        student.setName("Jerry")
        assert.strictEqual(student.getName(),"Jerry")

});