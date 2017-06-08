module.exports = function(db) {
    var fs = require('fs');
    var fileName1 =  '/GiphySlides.pptx';
    var fileName2 =  '/Giphy API.mp4';
    fs.readFile(__dirname + fileName1, function(err, fileData1){
	fs.readFile(__dirname + fileName2, function(err, fileData2){

	var metaData = {
	    Nibble: {
		title: "Intro to Giphy API",
		description: "A nibble",
		num_downloads: 2435,
		rating: 5,
		difficulty: 3,
		duration: 20,
		featured: true
	    },
	    Contents: [
		{
		    title: "Giphy Slides",
		    fileName: fileName1,
		    file : fileData1
		},
		{
		    title: "Giphy Video",
		    fileName: fileName2,
		    file : fileData2
		}
	    ],
	    User: {
		name: "Rachel Gardner",
		bio: "Just some person."
	    }
	};

	require('./createNibble.js')(metaData, fileData1, fileData2);

	});
    });

    var data = 
	{
	    titles: ['Getting Started with the Giphy API', 'How to Giphy', 'Creating Mobile Apps with Giphy'],
	    descriptions: ['A brief overview of the Giphy API', 'The name says it all', 'A workshop focused class'],
	    num_downloads: [ 234, 3465, 2345],
	    ratings: [5, 4, 2]
	};
var i = 0;
//    for (var i = 0; i < 3; i++) {
//	console.log(i);
//	console.log(data.titles[i]);
var i = 1;
	var fileName1 =  '/GiphySlides.pptx';
	var fileName2 =  '/Giphy API.mp4';
	fs.readFile(__dirname + fileName1, function(err, fileData1){
	    fs.readFile(__dirname + fileName2, function(err, fileData2){
		console.log(i);
		console.log(data.titles[i]);
		var metaData = {
		    Nibble: {
			title: data.titles[i],
			description: data.descriptions[i],
			num_downloads: data.num_downloads[i],
			rating: data.num_downloads[i],
			difficulty: 3,
			duration: 20,
			featured: true
		    },
		    Contents: [
			{
			    title: "Giphy Slides",
			    fileName: fileName1,
			    file : fileData1
			},
			{
			    title: "Giphy Video",
			    fileName: fileName2,
			    file : fileData2
			}
		    ],
		    User: {
			name: "Rachel Gardner",
			bio: "Just some person.",
			existing: true
		    }
		};

		require('./createNibble.js')(metaData, fileData1, fileData2);

	    });
	});

    var i = 2;
	var fileName1 =  '/GiphySlides.pptx';
	var fileName2 =  '/Giphy API.mp4';
	fs.readFile(__dirname + fileName1, function(err, fileData1){
	    fs.readFile(__dirname + fileName2, function(err, fileData2){
		console.log(i);
		console.log(data.titles[i]);
		var metaData = {
		    Nibble: {
			title: data.titles[i],
			description: data.descriptions[i],
			num_downloads: data.num_downloads[i],
			rating: data.num_downloads[i],
			difficulty: 3,
			duration: 20,
			featured: true
		    },
		    Contents: [
			{
			    title: "Giphy Slides",
			    fileName: fileName1,
			    file : fileData1
			},
			{
			    title: "Giphy Video",
			    fileName: fileName2,
			    file : fileData2
			}
		    ],
		    User: {
			name: "Rachel Gardner",
			bio: "Just some person.",
			existing: true
		    }
		};

		require('./createNibble.js')(metaData, fileData1, fileData2);

	    });
	});


    var fileName1 =  '/CS_Beyond_the_AP.pptx';
    var fileName2 =  '/NVIDIA_AI_Car_Demonstration.mp4';
    fs.readFile(__dirname + fileName1, function(err, fileData1){
	fs.readFile(__dirname + fileName2, function(err, fileData2){

	var metaData = {
	    Nibble: {
		title: "CS Beyond the AP",
		description: "An overview of what computer science looks like after high school.",
		num_downloads: 2435,
		rating: 5,
		difficulty: 3,
		duration: 20,
		featured: true
	    },
	    Contents: [
		{
		    title: "Slides",
		    fileName: fileName1,
		    file : fileData1
		},
		{
		    title: "Video of AI Car",
		    fileName: fileName2,
		    file : fileData2
		}
	    ],
	    User: {
		name: "Michelle Park",
		bio: "A wonderful person"
	    }
	};

	require('./createNibble.js')(metaData, fileData1, fileData2);

	});
    });

/*
	    if(err){
	    throw err;
	}

	var nibble1 = db.Nibble.create(
	    {
		title: "Intro to Giphy API",
		description: "A nibble",
		num_downloads: 2435,
		rating: 5,
		difficulty: 3,
		duration: 20,
		featured: true,
		Contents: [{
		    title: "Giphy Slides",
		    fileName: 'GiphySlides.pptx',
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
		return user.addNibble(nibble).then(function(user){
		    console.log("added nibble1, user1, content1");
		});
	    });
	});
    });

    var otherSlides = fs.readFile(__dirname + '/CS_Beyond_the_AP.pptx', function(err,data){
	if(err){
	    throw err;
	}

	var nibble1 = db.Nibble.create(
	    {
		title: "CS Beyond the AP",
		description: "A quick overview of college CS.",
		num_downloads: 1703,
		rating: 3,
		difficulty: 3,
		duration: 75,
		featured: true,
		Contents: [{
		    title: "CS Beyond the AP",
		    fileName: 'CS_Beyond_the_AP.pptx',
		    file : data
		}]
	    },
	    {
		include: [db.Content]
	    }
	).then(function(nibble){
	    return db.User.create(
		{
		    name: "Michelle Park",
		    bio: "A really cool person.",
		}
	    ).then(function(user){
		return user.addNibble(nibble).then(function(user){
		    console.log("added nibble2, user2, content2");
		});
	    });
	});
    });
/*
    var user2 = db.User.create(
	{
	    name: "Michelle Park",
	    bio: "A really cool person.",
	}
    ).then(function(user2){
	console.log("added user2, nibble2");
//	var data2 = fs.readFile(__dirname + '/CS_Beyond_the_AP.pptx', function(err,data){
	var giphySlides = fs.readFile(__dirname + '/GiphySlides.pptx', function(err,data){
	    var nibble3 = db.Nibble.create(
		{
		    title: "CS Beyond the AP",
		    description: "A quick overview of college CS.",
		    num_downloads: 1703,
		    rating: 3,
		    difficulty: 3,
		    featured: true,
		    Contents: [{
			title: "CS Beyond the AP",
			file : data
		    }]
		},
		{
		    include: [db.Content]
		}
	    ).then(function(nibble){
		user2.addNibble(nibble);
	    });
    });
});
*/
};

