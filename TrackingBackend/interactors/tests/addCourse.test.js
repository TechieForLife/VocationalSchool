const addCourse = require("../addCourse")

test("Able to add course from interactor", async () => {
	const courseName = "Intro to HTML"

	const course = await addCourse(courseName)
	expect(course).toEqual(expect.objectContaining({name: courseName}))
})