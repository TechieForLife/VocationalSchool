const sequelize = require('./index')


const Course = sequelize.models.course
test("Courses may be created", async () => {
	await sequelize.sync()
	const course = await Course.create({name: "test"})
	expect(course.name).toBe("test")
})

test("Courses may be queried", async () => {
	//await sequelize.sync()
	const course = await Course.create({name: "foo"})
	const foundCourse = await Course.findOne({where: {name: "foo"}})
	expect(course.id).toBe(foundCourse.id)
})

test("Courses may be updated", async () => {
	const course = await Course.create({name: "bar"})
	course.name = "bar2"
	await course.save()

	const updatedCourse = await Course.findOne({where: {name: "bar2"}})
	expect(updatedCourse.name).toBe("bar2")
})

test("Courses may be deleted", async () => {
	const course = await Course.create({name: "destroyMe"})
	await course.destroy()

	expect(Course.findOne({where: {name: "destroyMe"}})).resolves.toBe(null)
})