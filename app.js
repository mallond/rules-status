/*global require: false, console: false, module: false, __dirname: false*/

(function () {

    "use strict";

    var dao = require('./db');
    var routes = require('./routes/status');
    var security = require('./security');

    var express = require('express');
    var logger = require('morgan');
    var cookieParser = require('cookie-parser');
    var bodyParser = require('body-parser');
    var session = require('express-session');
    var mongoose = require('mongoose');
    var path = require('path');
    var favicon = require('static-favicon');

    var app = express();

    // view engine setup - demo only
    if (app.get('env') === 'development') {
        app.set('views', path.join(__dirname, 'demoViews'));
        app.set('view engine', 'jade');
    }

    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded());
    app.use(express.static(path.join(__dirname, 'demo')));

    // Create cookie session
    app.use(cookieParser());
    app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}));

    // Top level - *all routes
    app.use(function (req, res, next) {
        security.authenticate(req, res, next);
    });

    // Routes - CRUD Unix architecture of
    // Everything is a File onto the Web's
    // Everything is a URI making GET a '<', PUT a '>' and POST a pipe '|'
    app.put('/status', routes.create);   // brand new idempotent
    app.get('/status', routes.read);
    app.post('/status', routes.update);
    app.delete('/status', routes.del);

    if (app.get('env') === 'development') {
        app.get('/demo', routes.demo);
    }

    // catch 404 and forwarding to error handler
    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // error handlers

    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
        app.use(function (err, req, res, next) {
            res.status(err.status || 500);
            res.send('error', {
                message: err.message,
                error: err
            });
        });
    }

    // production error handler
    // no stacktraces leaked to user
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.send('error', {
            message: err.message,
            error: {}
        });
    });

    module.exports = app;

    console.log('app.js Started');

})();
