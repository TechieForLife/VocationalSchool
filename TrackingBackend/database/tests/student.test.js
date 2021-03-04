const sequelize = require('./index')

const Student = sequelize.models.student
test("Students may be created", async () => {
	await sequelize.sync({force: true})

	const firstName = "John"
	const lastName = "Doe"

	const student = await Student.create({firstName, lastName})
	expect(student).toEqual(expect.objectContaining({firstName, lastName}))
})

test("Students may be queried", async () => {
	//await sequelize.sync()
	const firstName = "John"

	const foundStudent = await Student.findOne({where: {firstName}})
	expect(foundStudent).toEqual(expect.objectContaining({firstName}))
})

test("Students may be updated", async () => {
	const oldStudent = await Student.findOne({where: {firstName: "John"}})
	oldStudent.firstName = "Joe"
	oldStudent.save()

	const updatedStudent = await Student.findOne({where: {firstName: "Joe"}})
	expect(updatedStudent).toEqual(expect.objectContaining({firstName: "Joe"}))
})

test("Students may be deleted", async () => {
	const student = await Student.create({firstName: "Destroy", lastName: "Me"})
	await student.destroy()

	expect(Student.findOne({where: {firstName: "Destroy"}})).resolves.toBe(null)
})