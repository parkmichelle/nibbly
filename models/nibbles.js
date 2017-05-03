"use strict";
/*
module.exports = function(sequelize, DataTypes) {
 var Nibble = sequelize.define("Nibble", {
     nid : {
	 type : DataTypes.INTEGER,
	 primaryKey : true
     },
     title : {
	 type : DataTypes.STRING,
	 allowNull : false
     },
     description : {
	 type : DataTypes.STRING,
     },
     num_downloads : {
	 type : DataTypes.INTEGER
     },
     rating : {
	 type : DataTypes.INTEGER
     },
     difficulty : {
	 type : DataTypes.INTEGER
     },
     
 });
    return Nibble;
};
*/

module.exports = function(sequelize, DataTypes) {
 var Nibble = sequelize.define("Nibble", {
     title : {
	 type : DataTypes.STRING,
	 allowNull : false
     },
     description : {
	 type : DataTypes.STRING,
     },
     num_downloads : {
	 type : DataTypes.INTEGER
     },
     rating : {
	 type : DataTypes.INTEGER
     },
     difficulty : {
	 type : DataTypes.INTEGER
     },
     
 });
    return Nibble;
};
