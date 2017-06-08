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
var bodyParser = require('body-parser');

var multer = require('multer');
var processFormBody = multer({storage: multer.memoryStorage()}).single('uploadedfile');

var express = require('express');
var app = express();

/* create a relation such that each user
   can have many nibbles (automatically handles
   creation of foreign keys)
*/
User.hasMany(Nibble);
Nibble.belongsTo(User);

//Content.hasOne(ContentType);

Nibble.hasMany(Content);
Content.belongsTo(Nibble);

// We have the express static module (http://expressjs.com/en/starter/static-files.html) do all
// the work for us.
app.use(express.static(__dirname));
app.use(bodyParser.json());

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

// get featured nibbles
app.get('/list/featured', function(req, res) {
    Nibble.findAll({
	where : {featured: true},
	include : [User, Content],
	order: [['rating', 'DESC']],
	limit: 5
    }).then(function(nibbles) {
	res.json(nibbles);
    });
});

// search nibbles
app.get('/list/nibbles/:query', function(req, res) {
    console.log("query: ", req.params.query);
    Nibble.findAll({
	where : {title: {$iLike : '%' + req.params.query + '%'}},
	include : [User],
	order: [['rating', 'DESC']]
    }).then(function(nibbles) {
	console.log("nibbles: ", nibbles);
	res.json(nibbles);
    });
});

// get a nibble by ID
app.get('/nibble/:id', function(req, res) {
    var id = req.params.id;
    Nibble.findById(id, {include:[User, Content]}).then(function(nibble) {
	res.json(nibble);
    });
});

var Stream = require('stream');

app.get('/download/nibble/:id',function(req,res){	
    var id = req.params.id;
    Nibble.findById(id, {include:[User, Content]}).then(function(nibble) {
	var newNumDownloads = nibble.num_downloads + 1;
	nibble.update({num_downloads: newNumDownloads});
//	for (var i = 0; i < nibble.Contents.length; i++){
	var i = 0;
	    var fileId = nibble.Contents[i].fileId;
	    console.log("Now downloading...", fileId);
	    if (fileId != null) { 
		var jwtClient = new google.auth.JWT(
		    key.client_email,
		    null,
		    key.private_key,
		    SCOPES,
		    null
		);

		jwtClient.authorize(function (err, tokens) {
		    if (err) {
			console.log('The API returned an error: ' + err);
			return;
		    }

		    var mime = require('mime');
		    var sourceType = mime.lookup(nibble.Contents[i].fileName);

		    if (sourceType == 'application/vnd.google-apps.presentation' ||
		       'application/vnd.openxmlformats-officedocument.presentationml.presentation') {
			var destType = 'application/vnd.oasis.opendocument.presentation';
		    } else {
			var destType = sourceType;
		    }

		    console.log("sourceType: ", sourceType);
		    console.log("destType: ", destType);
		    console.log(nibble.Contents[i].fileName);
		    res.set('Content-Type', destType);
		    res.type(destType);
		    res.set('Content-Disposition','attachment;filename='+nibble.Contents[i].fileName);// + nibble.title + '.pptx');

		    var stream = drive.files.export({
			fileId: fileId,
			mimeType: destType,
			auth: jwtClient,
			fields: 'webContentLink, webViewLink, viewersCanCopyContent',
			alt: 'media'
		    }).on('end', function() {

		    }).on('error', function(err) {
			console.log('Error during download', err);
		    }).pipe(res);
		});
//	    }
/*
	// get everything as a buffer 
	var zipped = zip.toBuffer();
	var size = Buffer.byteLength(zipped, 'binary');

	res.writeHead(200, {
            'Content-Type': 'application/octet-stream',
            'Content-Disposition': 'attachment;filename=' + nibble.title + '.zip',
	    'Content-Length': size
	});
	res.end(zipped);
*/
	}
    });
});

var fs = require('fs');
var google = require('googleapis');
var drive = google.drive('v3');
var SCOPES = ['https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/drive.metadata'];
var key = require('../api_keys/client_secret.json');


function createNibble(metaData, res, resp) {
    Nibble.create({
	title: metaData.title,
	description: metaData.description,
	num_downloads: 0,
	rating: 0,
	difficulty: parseInt(metaData.difficulty),
	duration: parseInt(metaData.duration)
    }).then(function(nibble){
	Content.create({
	    title: metaData.title,
	    fileId: resp.id, 
	    downloadLink: resp.webContentLink,
	    viewLink: resp.webViewLink,
	    fileName: metaData.title
	}).then(function(content){
	    content.setNibble(nibble);
	    nibble.setUser(1);
	    res.status(200).send(JSON.stringify(nibble.id));
	    res.end();
	}).catch(function(error){
	    console.log("ops: " + error);
	    res.status(500).json({error: 'error'});
	});
    }).catch(function(error){
	console.log("ops: " + error);
	res.status(500).json({error: 'error'});
    });
}

var mime = require('mime');

app.post('/nibble/new', function(req, res) {
    processFormBody(req, res, function (err) {
	var metaData = req.body;
	var jwtClient = new google.auth.JWT(
	    key.client_email,
	    null,
	    key.private_key,
	    SCOPES,
	    null
	);

	var sourceType = mime.lookup(req.file.originalname);

	// convert powerpoints to slides (TODO - cover all cases)
	if (sourceType == 'application/vnd.ms-powerpoint' ||
	   sourceType == 'application/vnd.openxmlformats-officedocument.presentationml.presentation') {
	    var destType = 'application/vnd.google-apps.presentation';
	} else {
	    var destType = sourceType;
	}
	console.log("sourceType: ", sourceType);
	console.log("destType: ", destType);
	jwtClient.authorize(function (err, tokens) {
	    if (err) {
		console.log(err);
		return;
	    }
	    console.log("tokens: ", tokens);
	    drive.files.create({
		auth: jwtClient,
		resource: {
		    name: req.file.originalname,
		    'mimeType': destType,
		},
		viewersCanCopyContent: true,
		fields: 'webContentLink, webViewLink, id, viewersCanCopyContent',
		published: true,
		publishAuto: true,
		media: {
		    mimeType: sourceType,
		    body: req.file["buffer"]
		}
	    }, function(err, resp) {
		console.log("inner resp", resp);
		var userPermission = {
		    'type': 'anyone',
		    'role': 'reader',
		}
		drive.permissions.create({
		    resource: userPermission,
		    auth: jwtClient,
		    fileId: resp.id,
		    fields: 'id',
		}, function(err) {
		    if (err) {
			console.log(err); 			// Handle error
			return;
		    }
		    console.log("ID: ", resp.id);
		    createNibble(metaData, res, resp);
		});
	    });
	});
    });
});


var server = app.listen(3000, function () {
    var port = server.address().port;
    console.log('Listening at http://localhost:' + port + ' exporting the directory ' + __dirname);
});
