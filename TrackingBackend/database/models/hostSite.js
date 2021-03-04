module.exports = function(sequelize, DataTypes) {
	return sequelize.define("hostSite", {
		url: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false
		},
		name: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false
		}
	})
}