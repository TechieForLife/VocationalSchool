const {Sequelize, DataTypes} = require('sequelize')
const {applyAssociations} = require('../extra-setup')
const logger = require('../../utils/logger.js')

// Database Connection Setup
const sequelize = new Sequelize("sqlite::memory", {logging: false})


//Import models from folder.
const modelFilenames = ["assignment", "course", "credentials", "hostSite", "student", "submission"]
const modelDefiners = 
	modelFilenames
		.map(filename => require(`../models/${filename}`))


// Initialize Models
modelDefiners.forEach(definer => definer(sequelize, DataTypes))


// Apply Associations
applyAssociations(sequelize)

// sequelize.sync({force: true})
module.exports = sequelize