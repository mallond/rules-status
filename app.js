/*global require: false, console: false, module: false, __dirname: false*/

(function () {

    "use strict";

    var dao = require('./db');
    var routes = require('./routes/statusRouter');
    var security = require('./security');
    var config = require('./config.json');
    var express = require('express');
    var logger = require('morgan');
    var bodyParser = require('body-parser');
    var session = require('express-session');
    var mongoose = require('mongoose');
    var path = require('path');
    var favicon = require('static-favicon');
    var jwt = require('jwt-simple');

    var app = express();

    // Json Web Token
    app.set('jwtTokenSecret', config.tokenKey);


    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded());
    app.use(express.static(path.join(__dirname, 'demo')));
    app.use(favicon(__dirname + '/demo/images/favicon.ico'));


    // Request Json Web Token
    app.get('/authenticate', routes.getToken);

    // Insure user has been given token key
    app.use('/status', function (req, res, next) {
        security.authenticate(req, res, next);
    });

    // Set Cross Origin Resource Sharing
    app.use('/status', function(req, res, next) {
        security.cors(req, res, next);

    });

    app.put('/status', routes.create);   // brand new idempotent
    app.get('/status', routes.read);
    app.post('/status', routes.update);
    app.delete('/status', routes.delete);

    // Route for demo
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

})();
