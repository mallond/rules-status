/*global require: false, console: false, module: false, __dirname: false*/

(function () {

    "use strict";

    var express = require('express');
    var path = require('path');
    var favicon = require('static-favicon');
    var logger = require('morgan');
    var cookieParser = require('cookie-parser');
    var bodyParser = require('body-parser');
    var session = require('express-session');
    var mongoose = require('mongoose');


    // DB Connect
    mongoose.connect('mongodb://localhost:27017/assignments');

    var app = express();

    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');

    app.use(favicon());
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded());
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));


    // Create cookie session
    app.use(cookieParser());
    app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}));


    // Top level - *all requests
    app.use(function (req, res, next) {

        var sess = req.session;

        // Session exist and user authenticated
        if (sess.user !== undefined && sess.user.authenticated === true) {
            next();
        } else {
            authenticate(req, res, sess, next);
        }

    });

    var authenticate = function(req, res, sess, next) {
        // Hack user: john and pwd smith
        var name = req.query.name;
        var pwd = req.query.pwd;
        if (name === 'john' && pwd  == 'smith') {
            sess.user = {name: name, authenticated: true};
            next();
        } else {
            res.json({ok: 0});
        }

    };

    app.get('/authenticate', function (req, res, next) {
        var sess = req.session;
        if (sess.user !== undefined && sess.user.authenticated === true) {
            res.json({ok: 1});
        } else {
            res.json({ok: 0});
        }

    });

    // Assignment verb level create
    app.post('/assignments/create', function (req, res, next) {
        var sess = req.session;
        res.json({id: '/', description: ' you da dawg', dawg: sess.dawg});

    });

    // Assignment verb level read
    app.get('/assignments/read', function (req, res, next) {
        var sess = req.session;
        res.json({id: '/', description: ' you da dawg', dawg: sess.dawg});

    });

    // Assignment verb level update
    app.post('/assignments/update', function (req, res, next) {
        var sess = req.session;
        res.json({id: '/', description: ' you da dawg', dawg: sess.dawg});

    });

    // Assignment verb level delete
    app.delete('/assignments/delete', function (req, res, next) {
        var sess = req.session;
        res.json({id: '/', description: ' you da dawg', dawg: sess.dawg});

    });

    // Assignment verb level list
    app.get('/assignments/list', function (req, res, next) {
        var sess = req.session;
        res.json({id: '/', description: ' you da dawg', dawg: sess.dawg});

    });

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
            res.render('error', {
                message: err.message,
                error: err
            });
        });
    }

    // production error handler
    // no stacktraces leaked to user
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });

    module.exports = app;

})();
