// WEHW that name is a mouthful!
// This script is non-functional. It describes our intended integrations.
const KhanAcademyScraper = require("../integrations/khanAcademy")
const google = require("../integrations/google")

const main = async () => {
	if (process.argv.length < 4) {
		console.log("Please specify the KhanAcademyCourseName and GoogleCourseName.")
		return
	}
	const [node, path, khanAcademyCourseName, googleCourseName] = process.argv

	const kaScraper = new KhanAcademyScraper()
	await kaScraper.build()
	await google.build()

	// Grab assignments from khanAcademy
	const assignments = await kaScraper
		.getAssignmentsByCourseName(khanAcademyCourseName)
		.catch(e => console.error(`Failed to fetch assignments: ${e}`))

	console.log(assignments)

	// if (!google.courseExists(googleClassroomCourseName)) {
	// 	await google
	// 		.createCourse(googleClassroomCourseName)
	// 		.catch(e => console.error(`Failed to create course ${googleClassroomCourseName} for Google Classroom`))
	// }

	// await google
	// 	.addAssignmentsToCourse(assignments, googleClassroomCourseName)
	// 	.catch(e => console.error(`Failed to add assignments to google classroom.`))
}

main()
// module.exports = async function(khanAcademyCourseName, khanAcademyCourseCategory, googleClassroomCourseName) {
	
//