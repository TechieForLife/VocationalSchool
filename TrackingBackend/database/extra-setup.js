const applyAssociations = sequelize => {
	const {student, course, hostSite, credentials, submission, assignment} = sequelize.models

	assignment.belongsTo(course)
	course.hasMany(assignment)
	assignment.belongsTo(hostSite)
	hostSite.hasMany(hostSite)

	submission.hasOne(student)
	// student.hasMany(submission)
	submission.hasOne(assignment)
	// assignment.hasMany(submission)

	credentials.hasOne(hostSite)
	// hostSite.hasMany(credentials)
	credentials.hasOne(student)
	// student.hasMany(student)
}

module.exports = {applyAssociations}