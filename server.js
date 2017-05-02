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
 * This webServer exports the following URLs:
 * /              -  Returns a text status message.  Good for testing web server running.
 * /test          - (Same as /test/info)
 * /test/info     -  Returns the SchemaInfo object from the database (JSON format).  Good
 *                   for testing database connectivity.
 * /test/counts   -  Returns the population counts of the cs142 collections in the database.
 *                   Format is a JSON object with properties being the collection name and
 *                   the values being the counts.
 *
*/

//var mongoose = require('mongoose');
var async = require('async');


// Load the Mongoose schema for User, Photo, and SchemaInfo
//var Nibble = require('./schema/nibble.js');

// attempt to set up sequel-ize???!!!

var models = require('./models'); //place on top of the file
//var Nibble = unknown.nibble;
//console.log(Nibble);
console.log(models);
console.log(models.Nibble);
// end of sketchy code


var express = require('express');
var app = express();


// We have the express static module (http://expressjs.com/en/starter/static-files.html) do all
// the work for us.
app.use(express.static(__dirname));

app.get('/', function (request, response) {
    response.send('Simple web server of files from ' + __dirname);
});

app.get('/list/nibbles', function(req, res) {
    models.Nibble.findAll().then(function(nibbles) {
	res.json(nibbles);
    });
});

app.post('/nibble', function(req, res) {
    models.Nibble.create({
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
