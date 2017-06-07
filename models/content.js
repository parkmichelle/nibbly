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
     fileId : {
	 type : DataTypes.STRING,
     },
     downloadLink : {
	 type : DataTypes.STRING,
     },
     viewLink : {
	 type : DataTypes.STRING,
     },
     fileName : {
	 type : DataTypes.STRING,
     },
     notes : {
	 type : DataTypes.STRING,
     }
 });
    return Content;
};
