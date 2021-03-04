const googleAPI = require("../google")

test("Can get a list of courses", async () => {
	await googleAPI.build()
	const courses = await googleAPI.getCourses()

	expect(courses.length).toBeGreaterThanOrEqual(2)
})

test("Can get a list of assignments for a course", async () => {
	//TODO: Implement
})

test("Can get a course by its name", async () => {
	const course = await googleAPI.getCourseByName("Web Programming")
	expect(course.name).toBe("Web Programming")
})