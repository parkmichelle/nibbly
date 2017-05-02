"use strict";

module.exports = function(sequelize, DataTypes) {
 var User = sequelize.define("User", {
     nid : {
	 type : DataTypes.INTEGER,
	 primaryKey : true
     },
     name : {
	 type : DataTypes.STRING,
	 allowNull : false
     },
     bio : {
	 type : DataTypes.STRING,
     }
 });
    return User;
};
