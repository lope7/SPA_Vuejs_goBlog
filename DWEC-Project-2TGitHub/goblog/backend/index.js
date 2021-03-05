'use strict'

var mongoose = require('mongoose');

var app = require('./app');

var port = 3900;

mongoose.set('useFindAndModify', false);

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/api_rest_entries', { useNewUrlParser: true })

    .then(() => {
        console.log('Succesfull connection!');

        // Create server
        app.listen(port, () => {
            console.log('Server running on http://localhost:' + port);
        });

    });