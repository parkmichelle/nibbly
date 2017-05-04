"use strict";
 
var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var env = process.env.NODE_ENV || "development";

// pull database config info from config.json
var config = require(__dirname + '/config/config.json')[env];
var sequelize = new Sequelize(config.database, config.username, config.password, config);
var db = {};

// load all models from this folder
// NOTE: ignores back-up files (those with ~), and the current file 
fs.readdirSync(__dirname + '/models/').filter(function(file) {
 return (file.indexOf(".") !== 0) && (file !== "index.js") && (file.indexOf("~") == -1);
}).forEach(function(file) {
 var model = sequelize["import"](path.join(__dirname + '/models/', file));
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

var fs = require('fs')

var giphySlides = fs.readFile(__dirname + '/seedContent/GiphySlides.pptx', function(err,data){
    if(err){
	throw err;
    }

    var nibble1 = db.Nibble.create(
	{
	    title: "Intro to Giphy API",
	    description: "A nibble",
	    num_downloads: 2435,
	    rating: 4,
	    difficulty: 3,
	    Contents: [{
		title: "Giphy Slides",
		file : data
	    }]
	},
	{
	    include: [db.Content]
	}
    ).then(function(nibble){
	return db.User.create(
	    {
		name: "Rachel Gardner",
		bio: "Just some person."
	    }
	).then(function(user){
	    return user.addNibble(nibble).then(function(){
		console.log("added nibble");
	    });
	});
    });
});

var user2 = db.User.create(
    {
	name: "Michelle Park",
	bio: "A really cool person.",
	Nibbles: 
	[{
	    title: "Python!",
	    description: "Another nibble",
	    num_downloads: 2435,
	    rating: 4,
	    difficulty: 3
	}]
    },
    {
	include: [db.Nibble]
    }
);

/*
user1.addNibble(nibble1).then(function(){
    console.log("Added nibble1 to user1!");
});
*/


