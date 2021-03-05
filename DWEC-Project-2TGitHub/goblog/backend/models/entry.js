'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EntrySchema = Schema({
    title: String,
    content: String,
    date: String,
    dateUpload: { type: Date, default: Date.now },
    image: String
});

module.exports = mongoose.model('Entry', EntrySchema);
