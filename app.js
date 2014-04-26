/*global require: false, console: false, module: false, __dirname: false*/

(function () {

    "use strict";

    var express = require('express');
    var logger = require('morgan');
    var cookieParser = require('cookie-parser');
    var bodyParser = require('body-parser');
    var session = require('express-session');
    var mongoose = require('mongoose');
    var path = require('path');
    var favicon = require('static-favicon');

    var routes = require('./routes/index');

    // DB Connect
    mongoose.connect('mongodb://localhost:27017/assignments');

    var app = express();

    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');

    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded());
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'demo')));



    // Create cookie session
    app.use(cookieParser());
    app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}));


    // Top level - *all requests
    app.use(function (req, res, next) {

        var sess = req.session;
        req.session.authenticated = true;

        // Session exist and user authenticate
        if (typeof req.session.user !== 'undefined' && req.session.user.authenticated === true) {
            next();
        } else {
            authenticate(req, res, sess, next);
        }

    });

    var authenticate = function(req, res, sess, next) {

        //Hack Will Always create default user if none specified
        var name = req.body.name;
        var password = req.body.password;

        name='John';
        password='password';


        req.session.user = {name: name, authenticated: true};
        req.session.save(function(err) {
            // session saved
        });
        next();

    };

    app.get('/authenticate', function (req, res, next) {
        var sess = req.session;
        if (sess.user !== undefined && sess.user.authenticated === true) {
            res.json({ok: 1});
        } else {
            res.json({ok: 0});
        }

    });



    // Demo
    app.get('/demo', function (req, res, next) {

        res.render('index', { title: 'BizAssign Demo' });

    });

    // Assignment verb level create
    app.post('/assignments/create', function (req, res, next) {

        res.json({ok:1, create:1});

    });

    // Assignment verb level read
    app.get('/assignments/read', function (req, res, next) {

        res.json({ok:1, read:1});

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

        res.json({ok:1});

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
