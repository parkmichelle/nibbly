"use strict";
/*
module.exports = function(sequelize, DataTypes) {
 var User = sequelize.define("User", {
     uid : {
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

*/
module.exports = function(sequelize, DataTypes) {
 var User = sequelize.define("User", {
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
