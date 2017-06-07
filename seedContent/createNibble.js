
function createNibble(metaData, fileInfo1, fileInfo2) {
    var models = require('../models');
    var Nibble = models.Nibble;
    var Content = models.Content;
    console.log("fileInfo1", fileInfo1);
    console.log("fileInfo2", fileInfo2);
    Nibble.create({
	title: metaData.Nibble.title,
	description: metaData.Nibble.description,
	num_downloads: 0,
	rating: 0,
	difficulty: parseInt(metaData.Nibble.difficulty),
	duration: parseInt(metaData.Nibble.duration)
    }).then(function(nibble){
	Content.create({
	    title: metaData.Contents[0].title,
	    fileId: fileInfo1.id, 
	    downloadLink: fileInfo1.webContentLink,
	    viewLink: fileInfo1.webViewLink,
	    fileName: metaData.Contents[0].fileName
	}).then(function(content1){
	    content1.setNibble(nibble);
	    Content.create({
		title: metaData.Contents[1].title,
		fileId: fileInfo2.id, 
		downloadLink: fileInfo2.webContentLink,
		viewLink: fileInfo2.webViewLink,
		fileName: metaData.Contents[1].fileName
	    }).then(function(content2){
		content2.setNibble(nibble);
		//	    nibble.setUser(1);
		console.log("Nibble id: ", nibble.id);
	    });
	}).catch(function(error){
	    console.log("ops: " + error);
	});
    }).catch(function(error){
	console.log("ops: " + error);
    });
}

module.exports = function(metaData, fileData1, fileData2) {
    var google = require('googleapis');
    var drive = google.drive('v3');
    var SCOPES = ['https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/drive.metadata']

    var key = require('../../api_keys/client_secret.json');
    var jwtClient = new google.auth.JWT(
	key.client_email,
	null,
	key.private_key,
	SCOPES,
	null
    );

    var mime = require('mime');
    var sourceType1 = mime.lookup(metaData.Contents[0].fileName);
    var destType2 = mime.lookup(metaData.Contents[1].fileName);

    if (sourceType1 == 'application/vnd.ms-powerpoint' ||
	sourceType1 == 'application/vnd.openxmlformats-officedocument.presentationml.presentation') {
	var destType1 = 'application/vnd.google-apps.presentation';
    } else {
	var destType1 = sourceType1;
    }

    jwtClient.authorize(function (err, tokens) {
	if (err) {
	    console.log(err);
	    return;
	}
	drive.files.create({
	    auth: jwtClient,
	    resource: {
		name: metaData.Contents[0].fileName,
		'mimeType': destType1,
	    },
	    viewersCanCopyContent: true,
	    fields: 'webContentLink, webViewLink, id',
	    published: true,
	    publishAuto: true,
	    media: {
		mimeType: sourceType1,
		body: fileData1
	    }
	}, function(err, resp1) {
	    var userPermission = {
		'type': 'anyone',
		'role': 'reader',
	    }
	    drive.permissions.create({
		resource: userPermission,
		auth: jwtClient,
		fileId: resp1.id,
		fields: 'id',
	    }, function(err) {
		if (err) {
		    console.log(err); 			// Handle error
		    return;
		}
	    });

	    // insert video
	    drive.files.create({
		auth: jwtClient,
		resource: {
		    name: metaData.Contents[1].fileName,
		    'mimeType': destType2,
		},
		viewersCanCopyContent: true,
		fields: 'webContentLink, webViewLink, id',
		published: true,
		publishAuto: true,
		media: {
		    mimeType: destType2,
		    body: fileData2
		}
	    }, function(err, resp2) {
		drive.permissions.create({
		    resource: userPermission,
		    auth: jwtClient,
		    fileId: resp2.id,
		    fields: 'id',
		}, function(err) {
		    if (err) {
			console.log(err); 			// Handle error
			return;
		    }
		    createNibble(metaData, resp1, resp2);
		});
	    });
	});
    });
};
