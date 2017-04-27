"use strict";

var nibblyModels = require('./modelData/nibblyData.js').nibblyModels;
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/nibbly');

var Nibble = require('./schema/nibble.js');
var async = require('async');
var versionString = '1.0';

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    var nibblyModel = nibblyModels.nibblyModel();
    async.each(nibblyModel, function(nibble, nibble_callback){
	Nibble.create({
	    title: nibble.title,
	    author: nibble.author,
	    description: nibble.description,
	    organization: nibble.organization,
	    rating: nibble.rating,
	    numDownloads: nibble.numDownloads
	}, function(mongoDb_err) { // deal with MongoDB errors
	    nibble_callback(mongoDb_err);
	});

    }, function(async_err) {
	if (async_err){
	    console.error('Async error: error creating nibble', async_err);
	} else {
	    console.log("?");
	    mongoose.disconnect();
	}
    });
});
