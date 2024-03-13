        const test = require('node:test');
		const assert = require('assert');
		const { MyClass, Student } = require('./main');
		

		test("Test MyClass's addStudent", () => {
		// TODO
		throw new Error("Test not implemented");
		const myClass = new MyClass();
		const student = new Student();
		student.setName('John Doe');
		const index = myClass.addStudent(student);
		assert.strictEqual(index, 0);
		

		const nonStudent = {};
		const wrongIndex = myClass.addStudent(nonStudent);
		assert.strictEqual(wrongIndex, -1);
		});
		

		test("Test MyClass's getStudentById", () => {
		// TODO
		throw new Error("Test not implemented");
		const myClass = new MyClass();
		const student = new Student();
		student.setName('Jane Doe');
		const index = myClass.addStudent(student);
		const retrievedStudent = myClass.getStudentById(index);
		assert.strictEqual(retrievedStudent, student);
		

		const nullStudent = myClass.getStudentById(-1);
		assert.strictEqual(nullStudent, null);
		});
		

		test("Test Student's setName", () => {
		// TODO
		throw new Error("Test not implemented");
		const student = new Student();
		student.setName('John Doe');
		assert.strictEqual(student.getName(), 'John Doe');
		

		student.setName(123);
		assert.strictEqual(student.getName(), 'John Doe');
		});
		

		test("Test Student's getName", () => {
		// TODO
		throw new Error("Test not implemented");
		});
		const student = new Student();
		assert.strictEqual(student.getName(), '');
		

		student.setName('Jane Doe');
		assert.strictEqual(student.getName(), 'Jane Doe');
		});

