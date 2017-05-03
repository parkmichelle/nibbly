"use strict";

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
     featured: {
	 type : DataTypes.BOOLEAN
     },
     difficulty : {
	 type : DataTypes.INTEGER
     },
     
 });
    return Nibble;
};
