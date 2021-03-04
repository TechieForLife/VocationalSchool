module.exports = function(sequelize, DataTypes) {
	return sequelize.define("assignment", {
		name: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false
		}
	})
}