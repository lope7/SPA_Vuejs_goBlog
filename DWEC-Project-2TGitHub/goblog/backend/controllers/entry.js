'use strict'

var validator = require('validator');

//Library for images
var fs = require('fs');
var path = require('path');

var Entry = require('../models/entry');

var controller = {

    /**
     * Method to save entries in the Database
     */
    save: (req, res) => {

        // Take params from POST
        var params = req.body;

        // Validate data (validator)
        try {
            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);

        } catch (err) {
            return res.status(200).send({
                status: 'error',
                message: 'Some data missed'
            });
        }

        if (validate_title && validate_content) {

            var entry = new Entry();

            // Assign values
            entry.title = params.title;
            entry.content = params.content;
            entry.image = null;

            entry.save((err, EntryStored) => {

                if (err || !EntryStored) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'The entry is not saved'
                    });
                }

                return res.status(200).send({
                    status: 'success',
                    entry: EntryStored
                });

            });

        } else {
            return res.status(200).send({
                status: 'error',
                message: 'Incorrect data'
            });
        }
    },

    /**
     * Method to get entries from the Database 
     */
    getEntries: (req, res) => {

        var query = Entry.find({});

        var last = req.params.last;

        if (last || last != undefined) {
            query.limit(5);
        }

        // Find
        query.sort('-_id').exec((err, entries) => {

            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error'
                });
            }

            if (!entries) {
                return res.status(404).send({
                    status: 'error',
                    message: 'Any entry to show'
                });
            }

            return res.status(200).send({
                status: 'success',
                entries
            });

        });
    },

    /**
     * Method to get an entry from the database
     */

    getEntry: (req, res) => {

        // Take the id from the URL
        var entryId = req.params.id;

        // Check if it exists
        if (!entryId || entryId == null) {
            return res.status(404).send({
                status: 'error',
                message: 'The entry doesn´t exist'
            });
        }

        // Find the entry
        Entry.findById(entryId, (err, entry) => {

            if (err || !entry) {
                return res.status(404).send({
                    status: 'error',
                    message: 'The entry doesn´t exist'
                });
            }

            // Return the JSON
            return res.status(200).send({
                status: 'success',
                entry
            });

        });
    },

    /**
     *Method to update entries 
     */

    update: (req, res) => {
        // Take the entry id from the URL
        var entryId = req.params.id;

        //Take data from PUT
        var params = req.body;

        // Validate data
        try {
            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);
        } catch (err) {
            return res.status(200).send({
                status: 'error',
                message: 'Data missed'
            });
        }

        if (validate_title && validate_content) {
            // Find and update
            Entry.findOneAndUpdate({ _id: entryId }, params, { new: true }, (err, entryUpdated) => {
                if (err) {
                    return res.status(500).send({
                        status: 'error',
                        message: 'Update failled'
                    });
                }

                if (!entryUpdated) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'The entry doesn´t exist'
                    });
                }

                return res.status(200).send({
                    status: 'success',
                    entry: entryUpdated
                });
            });
        } else {
            // Return and answer
            return res.status(200).send({
                status: 'error',
                message: 'Validation error'
            });
        }

    },

    /**
     * Method to delete entries from the database
     */

    delete: (req, res) => {

        // Take the id from the URL
        var entryId = req.params.id;

        // Find and delete
        Entry.findOneAndDelete({ _id: entryId }, (err, entryRemoved) => {
            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error'
                });
            }

            if (!entryRemoved) {
                return res.status(404).send({
                    status: 'error',
                    message: 'The entry wasn´t deleted'
                });
            }

            return res.status(200).send({
                status: 'success',
                entry: entryRemoved
            });

        });
    },

    /**
     * Method to upload image to the Database
     */
    upload: (req, res) => {

        // Take the file 
        var file_name = 'The image wasn´t uploaded';

        if (!req.files) {
            return res.status(404).send({
                status: 'error',
                message: file_name
            });
        }

        // Get the file name and extension
        var file_path = req.files.file0.path;
        var file_split = file_path.split('\\');

        // File name
        var file_name = file_split[2];

        // Extension file
        var extension_split = file_name.split('\.');
        var file_ext = extension_split[1];

        // Check the extension
        if (file_ext != 'png' && file_ext != 'jpg' && file_ext != 'jpeg' && file_ext != 'gif') {

            fs.unlink(file_path, (err) => {
                return res.status(200).send({
                    status: 'error',
                    message: 'Invalid extension'
                });
            });

        } else {

            // If everything is OK
            var entryId = req.params.id;

            if (entryId) {

                //Look for the entry, put it the name to te image and update
                Entry.findOneAndUpdate({ _id: entryId }, { image: file_name }, { new: true }, (err, entryUpdated) => {

                    if (err || !entryUpdated) {
                        return res.status(200).send({
                            status: 'error',
                            message: 'Error!'
                        });
                    }

                    return res.status(200).send({
                        status: 'success',
                        entry: entryUpdated
                    });
                });
            } else {
                return res.status(200).send({
                    status: 'success',
                    image: file_name
                });
            }

        }
    },

    /**
     * Method to get images from the Database
     */
    getImage: (req, res) => {
        var file = req.params.image;
        var path_file = './upload/images/' + file;

        fs.exists(path_file, (exists) => {
            if (exists) {
                return res.sendFile(path.resolve(path_file));
            } else {
                return res.status(404).send({
                    status: 'error',
                    message: 'The image doesn´t exist'
                });
            }
        });


    },

    /**
     *Method to search entries
     */
    search: (req, res) => {
        // Take the string to search
        var searchString = req.params.search;

        // Find or
        Entry.find({
            "$or": [
                { "title": { "$regex": searchString, "$options": "i" } },
                { "content": { "$regex": searchString, "$options": "i" } }
            ]
        })
            .sort([['date', 'descending']])
            .exec((err, entries) => {

                if (err) {
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error'
                    });
                }

                if (!entries || entries.length <= 0) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'Any entry to show'
                    });
                }

                return res.status(200).send({
                    status: 'success',
                    entries
                });

            });
    }


};  // End controller

//Export the controller
module.exports = controller;