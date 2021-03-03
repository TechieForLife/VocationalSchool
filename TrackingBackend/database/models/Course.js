module.exports = function(sequelize, DataTypes) {
	return sequelize.define("course", {
		name: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false
		}
	})
}