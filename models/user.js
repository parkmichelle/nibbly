"use strict";

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
     difficuly : {
	 type : DataTypes.INTEGER
     },
     
 }, {
     timestamps: false
 }
			      );
    return Nibble;
};


/*
var db = require('./index.js');

var sequelize = db.sequelize;

var Nibble = sequelize.define("nibble", {
    title : {
	type : sequelize.STRING,
	allowNull : false
    },
    description : {
	type : sequelize.STRING,
    }
});

module.exports = Nibble;
*/
