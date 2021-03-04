const sequelize = require('./index')

test("Table may be created", () => {
	expect()
})
test("Courses may be created", async () => {
	await sequelize.sync()

	expect(sequelize.models.course.create({name: "test"}).resolves.name.toBe("test"))
})