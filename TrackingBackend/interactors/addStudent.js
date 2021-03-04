const {student} = require("../database/index.js").models

module.exports = async function(firstName, lastName) {
	return await student.create({firstName, lastName})
}