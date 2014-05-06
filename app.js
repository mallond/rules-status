//     http://www.bizrez.com
//     (c) 2004-2014 David Mallon
//     Freely distributed under the MIT license.

/*global require: false, console: false, module: false, __dirname: false*/


(function () {

    "use strict";

    var dao = require('./db/db');
    var routes = require('./routes/statusRouter');
    var cors = require('./security/cors');
    var security = require('./security/security');
    var config = require('./config.json');
    var express = require('express');
    var logger = require('morgan');
    var bodyParser = require('body-parser');
    var mongoose = require('mongoose');
    var path = require('path');
    var favicon = require('static-favicon');
    var jwt = require('jwt-simple');
    var Log =  require('log');

    var log = new Log(config.logLevel);
    log.info('Logger loaded. Logging level: '+ config.logLevel);
    log.debug('Ready to Develop - debug mode set');

    var app = express();

    // Json Web Token
    app.set('jwtTokenSecret', config.tokenKey);

    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded());
    app.use(express.static(path.join(__dirname, 'demo')));
    app.use(favicon(__dirname + '/demo/images/favicon.ico'));

    // Allow Cross-origin resource sharing
    app.use(cors());

    // Request Json Web Token
    app.get('/authenticate', routes.getToken);

    app.use('/status', routes.authenticate);
    app.post('/status/create', routes.create);
    app.post('/status/read', routes.paginate);
    app.post('/status/update', routes.update);
    app.delete('/status/delete', routes.delete);


    // catch 404 and forwarding to error handler
    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

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
