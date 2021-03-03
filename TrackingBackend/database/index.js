const {Sequelize, DataTypes} = require('sequelize')
const {applyAssociations} = require('./extra-setup')
const logger = require('../utils/logger.js')

// Database Connection Setup
logger.verbose("Setting up database.")
const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: 'sqlite-database/db.sqlite',
})


// Import models from folder
logger.verbose("Importing models.")
const modelFilenames = ["Assignment", "Course", "Credentials", "HostSite", "Student", "Submission"]

const modelDefiners = 
	modelFilenames
		.map(filename => require(`./models/${filename}`))

// Initialize models with sequelize copy from above
logger.verbose("Initializing models.")
modelDefiners.forEach(definer => definer(sequelize, DataTypes))

// Apply associations between models
logger.verbose("Applying associations.")
applyAssociations(sequelize)

console.log(sequelize.models)

module.exports = sequelize