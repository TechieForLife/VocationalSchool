const {assignment, hostSite, course} = require("../database/index.js")

module.exports = async function (name, specificCourse, specificHostSite) {
	return await assignment.create({
		name,
		specificCourse,
		specificHostSite
	}, {
		include: [{
			association: course,
			as: "course"
		}, {
			association: hostSite,
			as: "hostSite"
		}]
	})
}