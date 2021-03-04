const khanAcademy = require('../khanAcademy')

jest.setTimeout(40 * 1000)
test("Able to pull assignments from course", async () => {
	await khanAcademy.build()

	const assignments = await khanAcademy.getAssignmentsByCourseName("Intro to HTML/CSS: Making webpages")

	expect(assignments.length).toBeGreaterThanOrEqual(10)
	expect(assignments).toContainEqual({
		name: 'More CSS text properties',
		url: 'https://www.khanacademy.org/computing/computer-programming/html-css/css-text-properties/pt/more-css-text-properties'
	})
})