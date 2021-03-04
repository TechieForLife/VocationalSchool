const addStudent = require("../addStudent")

test("Able to add student from interactor", async () => {
	const firstName = "John"
	const lastName = "Doe"

	const student = await addStudent(firstName, lastName)
	expect(student).toEqual(expect.objectContaining({firstName, lastName}))
})