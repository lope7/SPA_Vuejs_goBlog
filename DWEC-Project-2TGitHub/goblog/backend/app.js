'use strict'

// Load modules
var express = require('express');

var bodyParser = require('body-parser');

// Execute express (http)
var app = express();

// Load route files
var blog_routes = require('./routes/entry');

// Middlewares 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// CORS to allow request from the frontend side
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// Load routes
app.use('/api', entrie_routes);

// Export module(current file)
module.exports = app;