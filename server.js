"use strict";

/* jshint node: true */

/*
 * This builds on the webServer of previous projects in that it exports the current
 * directory via webserver listing on a hard code (see portno below) port. It also
 * establishes a connection to the MongoDB named 'cs142project6'.
 *
 * To start the webserver run the command:
 *    node server.js
 *
 * Note that anyone able to connect to localhost:portNo will be able to fetch any file accessible
 * to the current user in the current directory or any of its children.
 *
*/

var async = require('async');

// load all of the models
var models = require('./models');
var User = models.User;
var Nibble = models.Nibble;
var Content = models.Content;
var ContentType = models.ContentType;

var express = require('express');
var app = express();

/* create a relation such that each user
   can have many nibbles (automatically handles
   creation of foreign keys
*/
User.hasMany(Nibble);
Nibble.belongsTo(User);

//Content.hasOne(ContentType);

Nibble.hasMany(Content);
Content.belongsTo(Nibble);

// We have the express static module (http://expressjs.com/en/starter/static-files.html) do all
// the work for us.
app.use(express.static(__dirname));

app.get('/', function (request, response) {
    response.send('Simple web server of files from ' + __dirname);
});

// get all nibbles
app.get('/list/nibbles', function(req, res) {
    Nibble.findAll({
	where : {},
	include : [User, Content]
    }).then(function(nibbles) {
	res.json(nibbles);
    });
});

// get a nibble by ID
app.get('/nibble/:id', function(req, res) {
    var id = req.params.id;
    Nibble.findById(id, {include:[User, Content]}).then(function(nibbles) {
	res.json(nibbles);
    });
});

app.post('/nibble/new', function(req, res) {
    Nibble.create({
	title: req.body.title,
	description: req.body.description
    }).then(function(nibbles){
	res.json(nibbles.dataValues);
    }).catch(function(error){
	console.log("ops: " + error);
	res.status(500).json({error: 'error'});
    });
});

var server = app.listen(3000, function () {
    var port = server.address().port;
    console.log('Listening at http://localhost:' + port + ' exporting the directory ' + __dirname);
});
