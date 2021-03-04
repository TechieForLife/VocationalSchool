const sequelize = require('./index')

const {assignment, course, hostSite} = sequelize.models

test("Assignments may be created", async () => {
	await sequelize.sync({logging: false})


	const ass = await assignment.create({
		name: "Test Assignment",
		course: {
			name: "Test Course"
		},
		hostSite: {
			name: "Khan Academy",
			url: "https://www.khanacademy.org"
		},
	}, {
		include: [course, hostSite]
	})

	expect(ass.name).toBe("Test Assignment")
})

test("Assignments may be queried", async () => {
	const ass = await assignment.findOne({where: {name: "Test Assignment"}})

	expect(ass).toEqual(expect.objectContaining({name: "Test Assignment", courseId: expect.any(Number), hostSiteId: expect.any(Number)}))
})