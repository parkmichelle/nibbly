"use strict";

var mongoose = require('mongoose');


var nibbleSchema = new mongoose.Schema({
    title: String,
    author: String,
    description: String,
    rating: Number,
    numDownloads: Number
});

var Nibble = mongoose.model('Nibble', nibbleSchema);

module.exports = Nibble;
