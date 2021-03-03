module.exports = function(sequelize, DataTypes) {
	return sequelize.define("Credentials", {
		username: {
			type: DataTypes.STRING,
			unique: false,
			allowNull: false
		},
		password: { // gotta keep plaintext since it is used for scraping.
			type: DataTypes.STRING,
			unique: false,
			allowNull: false
		}
	})
}