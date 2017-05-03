module.exports = function(sequelize, DataTypes) {
 var ContentType = sequelize.define("ContentType", {
      title : {
	 type : DataTypes.STRING,
	 allowNull : false
     }
 });
    return ContentType;
};
