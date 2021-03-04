const {hostSite} = require("../database/index").models

module.exports = async function (url, name) {
	return await hostSite.create({url, name})
}