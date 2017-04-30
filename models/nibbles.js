"use strict";
module.exports = function(sequelize, DataTypes) {
 var Nibble = sequelize.define("Nibble", {
 title : {
 type : DataTypes.STRING,
 allowNull : false
 },
 description : {
 type : DataTypes.STRING,
 }
 });
 return Nibble;
};
