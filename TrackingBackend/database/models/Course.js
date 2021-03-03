module.exports = function(sequelize, DataTypes) {
	return sequelize.define("Course", {
		name: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false
		}
	})
}