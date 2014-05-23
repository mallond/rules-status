//     http://www.bizrez.com
//     (c) 2004-2014 David Mallon
//     Freely distributed under the MIT license.

/*global require: false, module: false, model: false, console: false*/

(function (app) {

    "use strict";

    var config = require('../config');
    var Log = require('log');
    var log = new Log(config.logLevel);
    log.info('Connect.js - Logger Set');

    var mongoose = require('mongoose');
    var schema = require('./schema');

    // DB Connect
    var dbConnect = config.db.host + ':' + config.db.port + '/' + config.db.name;
    mongoose.connect(dbConnect);

    log.info('mongoose connected: ' + dbConnect);

})();




