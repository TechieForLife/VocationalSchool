module.exports = function(sequelize, DataTypes) {
	return sequelize.define("Assignment", {
		name: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false
		}
	})
}