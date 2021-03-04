const applyAssociations = sequelize => {
	const {student, course, hostSite, credentials, submission, assignment} = sequelize.models

	assignment.belongsTo(course)
	course.hasMany(assignment)
	assignment.belongsTo(hostSite)
	hostSite.hasMany(hostSite)

	submission.hasOne(student)
	submission.hasOne(assignment)

	credentials.hasOne(hostSite)
	credentials.hasOne(student)
}

module.exports = {applyAssociations}