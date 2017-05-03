module.exports = function(sequelize, DataTypes) {
 var Content = sequelize.define("Content", {
     title : {
	 type : DataTypes.STRING,
	 allowNull : false
     },
     description : {
	 type : DataTypes.STRING,
     },
     file : {
	 type : DataTypes.BLOB,
     },
     notes : {
	 type : DataTypes.STRING,
     }
 });
    return Content;
};
