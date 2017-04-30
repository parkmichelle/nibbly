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
 * The following URLs need to be changed to fetch there reply values from the database.
 * /user/list     -  Returns an array containing all the User objects from the database.
 *                   (JSON format)
 * /user/:id      -  Returns the User object with the _id of id. (JSON format).
 * /photosOfUser/:id' - Returns an array with all the photos of the User (id). Each photo
 *                      should have all the Comments on the Photo (JSON format)
 * /photos        - Returns an array of all photos.
 */

var mongoose = require('mongoose');
var async = require('async');


// Load the Mongoose schema for User, Photo, and SchemaInfo
var Nibble = require('./schema/nibble.js');

var express = require('express');
var app = express();

mongoose.connect('mongodb://localhost/nibbly');

// We have the express static module (http://expressjs.com/en/starter/static-files.html) do all
// the work for us.
app.use(express.static(__dirname));

app.get('/', function (request, response) {
    response.send('Simple web server of files from ' + __dirname);
});

app.get('/nibble/:id', function(req, res){
    var id = req.params.id;
    Nibble.findOne({_id: id}, function(err, nibble){
	if (err || !nibble) {
	    res.status(400).send('Not found');
	    return;
	}
	res.status(200).send(JSON.parse(JSON.stringify(nibble)));
    });
});

app.get('/list/nibbles', function(req, res){
    Nibble.find({}, function(err, nibbles){
	if (err || !nibbles) {
	    res.status(400).send('Not found');
	    return;
	}
	res.status(200).send(JSON.parse(JSON.stringify(nibbles)));
    });
});

var server = app.listen(3000, function () {
    var port = server.address().port;
    console.log('Listening at http://localhost:' + port + ' exporting the directory ' + __dirname);
});
