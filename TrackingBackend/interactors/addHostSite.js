const {hostSite} = require("../models/index.js")

module.exports = async function (url, name) {
	return await hostSite.create({url, name})
}