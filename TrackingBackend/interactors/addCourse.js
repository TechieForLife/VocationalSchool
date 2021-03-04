const {course} = require("../database/index.js")

module.exports = async function(name, options = {}) {
	const course = await course.create({name})

	if (options.addToGoogleClassroom) {
		// TODO: Include Google Classroom API to create course on Google.
	}

	return course
}