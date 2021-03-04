const {student} = require("../database/index.js")

module.exports = async function(firstName, lastName) {
	return await student.create({firstName, lastName})
}