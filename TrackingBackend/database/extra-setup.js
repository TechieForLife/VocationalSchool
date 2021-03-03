const applyAssociations = sequelize => {
	const {student, course, hostSite, credentials, submission, assignment} = sequelize.models

	assignment.hasOne(course)
	assignment.hasOne(hostSite)

	submission.hasOne(student)
	submission.hasOne(assignment)

	credentials.hasOne(hostSite)
	credentials.hasOne(student)
}

module.exports = {applyAssociations}