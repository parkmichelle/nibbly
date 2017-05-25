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

// get a nibble by ID
app.get('/nibble/:id', function(req, res) {
    var id = req.params.id;
    Nibble.findById(id, {include:[User, Content]}).then(function(nibble) {
	res.json(nibble);
    });
});

app.get('/download/nibble/:id',function(req,res){	
    console.log("made it 0");
    var id = req.params.id;
    Nibble.findById(id, {include:[User, Content]}).then(function(nibble) {
	for (var i = 0; i < nibble.Contents.length; i++){
	    var byteArray = new Buffer(nibble.Contents[i].file);
	    var AdmZip = require('adm-zip');
	    var zip = new AdmZip();
	    console.log(nibble.Contents[i]);
	    zip.addFile(nibble.Contents[i].title + ".ppt", byteArray, '', parseInt('0644', 8) << 16);
	}

	// get everything as a buffer 
	var zipped = zip.toBuffer();

	res.writeHead(200, {
            'Content-Type': 'application/octet-stream',
            'Content-disposition': 'attachment;filename=' + 'test.zip',
	});
	res.end(new Buffer(zipped, 'binary'));
    });
});

app.post('/nibble/new', function(req, res) {
  processFormBody(req, res, function (err) {
      var timestamp = new Date().valueOf();
      var filename = String(timestamp) + req.file.originalname;

        Nibble.create({
          title: req.body.title,
          description: req.body.description
        }).then(function(nibble){
//	    console.log(req.file);
	    //	    var byteArray = new Buffer(req.file);
//	    var FileReader = require('filereader')
//	    var fileReader = new FileReader();
//	    fileReader.readAsArrayBuffer(req.file);

//	    fileReader.onload = function (event) {
//		var byteArray = event.target.result;
	    //var rawData = new Buffer(byteArray);
	    var fs = require('fs');
	    fs.writeFileSync("/tmp/file.pptx", req.file["buffer"], {}, 'binary');
//	    var rawData = new Uint8Array(req.file["buffer"], 'binary');
//	    console.log("rawData", rawData);
//	    var rawData = new Buffer(req.file);
		Content.create({
		    title: req.body.title,//filename,
//		    file: rawData //req.file["buffer"]
		    file: req.file["buffer"]
//		    fileName: filename
		}).then(function(content){
		    content.setNibble(nibble);
		    res.end();
		}).catch(function(error){
		    console.log("ops: " + error);
		    res.status(500).json({error: 'error'});
		});
//	    };
        }).catch(function(error){
          console.log("ops: " + error);
          res.status(500).json({error: 'error'});
        });
    });
});

var server = app.listen(3000, function () {
    var port = server.address().port;
    console.log('Listening at http://localhost:' + port + ' exporting the directory ' + __dirname);
});
