const {Sequelize, DataTypes} = require('sequelize')
const {applyAssociations} = require('./extra-setup')
const logger = require('../utils/logger.js')

var path = require('path');
var appDir = path.dirname(require.main.filename);

// Database Connection Setup
logger.verbose("Setting up database.")
const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: `${appDir}/database/db.sqlite`,
	logging: false
})


//Import models from folder.
logger.verbose("Importing models.")
const modelFilenames = ["Assignment", "Course", "Credentials", "HostSite", "Student", "Submission"]
const modelDefiners = 
	modelFilenames
		.map(filename => require(`./models/${filename}`))


// Initialize Models
logger.verbose("Initializing models.")
modelDefiners.forEach(definer => definer(sequelize, DataTypes))


// Apply Associations
logger.verbose("Applying associations.")
applyAssociations(sequelize)

sequelize.sync({force: true})
module.exports = sequelize