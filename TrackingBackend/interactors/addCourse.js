const {course} = require("../database/index.js").models

module.exports = async function(name, options = {}) {
	const specificCourse = await course.create({name})

	if (options.addToGoogleClassroom) {
		// TODO: Include Google Classroom API to create course on Google.
	}

	return specificCourse
}