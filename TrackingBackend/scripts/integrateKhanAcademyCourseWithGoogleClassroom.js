// WEHW that name is a mouthful!
// This script is non-functional. It describes our intended integrations.
const khanAcademy = "../integrations/khanAcademy"
const google = "../integrations/google"

module.exports = async function(khanAcademyCourseName, khanAcademyCourseCategory, googleClassroomCourseName) {
	await khanAcademy.build()
	await google.build()

	// Grab assignments from khanAcademy
	const assignments = await khanAcademy
		.getAssignmentsByCourseName(khanAcademyClassName)
		.catch(e => console.error(`Failed to fetch assignments: ${e}`))

	if (!google.courseExists(googleClassroomCourseName)) {
		await google
			.createCourse(googleClassroomCourseName)
			.catch(e => console.error(`Failed to create course ${googleClassroomCourseName} for Google Classroom`))
	}

	await google
		.addAssignmentsToCourse(assignments, googleClassroomCourseName)
		.catch(e => console.error(`Failed to add assignments to google classroom.`))
}