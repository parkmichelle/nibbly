"use strict";

var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var env = process.env.NODE_ENV || "development";

// pull database config info from config.json
var config = require(__dirname + '/../config/config.json')[env];
var sequelize = new Sequelize(config.database, config.username, config.password, config);
var db = {};

// load all models from this folder
// NOTE: ignores back-up files (those with ~), and the current file
fs.readdirSync(__dirname).filter(function(file) {
 return (file.indexOf(".") !== 0) && (file !== "index.js") && (file.indexOf("~") == -1);
}).forEach(function(file) {
 var model = sequelize["import"](path.join(__dirname, file));
 db[model.name] = model;
});

// add all the model objects into the database object
Object.keys(db).forEach(function(modelName) {
 if ("associate" in db[modelName]) {
 db[modelName].associate(db);
 }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

var models = require('./');
models.sequelize
    .sync({force: true})
    .then(function () {
	console.log('Connection successful');
    })
    .catch(function(error) {
	console.log("Error creating connection:", error);
    });
