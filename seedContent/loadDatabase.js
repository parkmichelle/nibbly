"use strict";

var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var env = process.env.NODE_ENV || "development";

// pull database config info from config.json
var config = require(path.join(__dirname,'../config/config.json'))[env];
config['logging'] = false;
var sequelize = new Sequelize(config.database, config.username, config.password, config);
var db = {};

// load all models from this folder
<<<<<<< HEAD:loadDatabase.js
// NOTE: ignores back-up files (those with ~), and the current file
fs.readdirSync(__dirname + '/models/').filter(function(file) {
=======
// NOTE: ignores back-up files (those with ~), and the current file
fs.readdirSync(path.join(__dirname,'../models/')).filter(function(file) {
>>>>>>> master:seedContent/loadDatabase.js
 return (file.indexOf(".") !== 0) && (file !== "index.js") && (file.indexOf("~") == -1);
}).forEach(function(file) {
 var model = sequelize["import"](path.join(__dirname,'../models/', file));
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

// TODO - move to another file

db.User.hasMany(db.Nibble);
db.Nibble.belongsTo(db.User);

//db.Content.hasOne(db.ContentType);

db.Nibble.hasMany(db.Content);
db.Content.belongsTo(db.Nibble);

// load all of the test data
require('./testData.js')(db);
