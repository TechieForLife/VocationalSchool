module.exports = function(sequelize, DataTypes) {
	return sequelize.define("Student", {
		firstName: {
			type: DataTypes.STRING,
			unique: false,
			allowNull: false
		},
		lastName: {
			type: DataTypes.STRING,
			unique: false,
			allowNull: false
		}
	})
}