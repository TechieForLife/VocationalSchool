const sequelize = require('./index')

const {assignment, submission, student, course, hostSite} = sequelize.models

test("Submissions may be created", async () => {
	await sequelize.sync({force: true})


	const sub = await submission.create({
		student: {
			firstName: "John",
			lastName: "Doe"
		},
		assignment: {
			name: "Test Assignment",
			course: {
				name: "Test Course"
			},
			hostSite: {
				name: "Khan Academy",
				url: "https://www.khanacademy.org"
			}
		}
	}, {
		include: [
			student, 
			{
				model: assignment,
				include: [course, hostSite]
			}
		]
	})

	expect(sub).toEqual(expect.objectContaining({
		submissionId: expect.any(Number)
	}))
})

test("Submissions may be queried by student", async () => {
	const sub = await submission
		.findOne({where: {student: {firstName: "John"}}})

	expect(sub).toEqual(expect.objectContaining({studentId: expect.any(Number)}))
})
