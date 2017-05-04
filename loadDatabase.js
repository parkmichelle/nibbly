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

//var models = require('./models/');

// TODO - move to another file

User.hasMany(Nibble);
Nibble.belongsTo(User);
Nibble.hasMany(Content);
Content.hasOne(ContentType);

var giphySlides = FS.readFileSync(__dirname + '\seedContent\GiphySlides.ppt');

var user1 = db.User.create(
    {
	name: "Rachel Gardner",
	bio: "Just some person.",
	Nibbles:
	[{
	    title: "Intro to Giphy API",
	    description: "A nibble",
	    num_downloads: 2435,
	    rating: 4,
	    difficulty: 3,
	    Content:
	    [{
		title: "Giphy Slides",
		file : giphySlides
	    }]
	}]

    },
    {
	include: [db.Nibble]
    }
);

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
