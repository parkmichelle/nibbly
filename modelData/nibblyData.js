"use strict";

(function() {

    var nibble1 = {
	title: "Intro to Giphy API",
	author: "Rachel Gardner",
	description: "Introduces the concept of APIs and teaches how to use Giphy API",
	rating: 4,
	numDownloads: 2595
    };

    var nibbles = [nibble1];
    
    var nibblyModel = function() {
	return nibbles;
    }

    var nibblyModels = {
	nibblyModel: nibblyModel
    };
//    console.log(nibblyModels);
    exports.nibblyModels = nibblyModels;
})();
	
