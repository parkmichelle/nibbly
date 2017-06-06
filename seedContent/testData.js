module.exports = function(db) {
    var fs = require('fs');
    var giphySlides = fs.readFile(__dirname + '/GiphySlides.pptx', function(err,data){
//    var giphySlides = fs.readFile(__dirname + '/CS_Beyond_the_AP.pptx', function(err,data){
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

