const googleAPI = require("../google")

test("Can grab a list of courses", async () => {
	await googleAPI.build()
	const courses = await googleAPI.getCourses()

	expect(courses.length).toBeGreaterThanOrEqual(2)
})