const {assignment, hostSite, course} = require("../database/index.js")

module.exports = async function (name, course, hostSite) {
	return await assignment.create({
		name,
		course,
		hostSite
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