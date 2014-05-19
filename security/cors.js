//     http://www.bizrez.com
//     (c) 2004-2014 David Mallon
//     Freely distributed under the MIT license.

/*global console: false, module: false, require: false*/

(function () {

    "use strict";

    var config = require('../config');
    var Log =  require('log');
    var log = new Log(config.logLevel);
    log.info('cors.js - Logger Set');

    module.exports = function cors(req, res, next) {

        return function cors(req, res, next) {

            res.header('Access-Control-Allow-Origin', req.headers.origin);
            res.header('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');

            // Intercept OPTIONS method
            if (req.method === 'OPTIONS') {
                res.send("{'ok':1'}",200);
            }
            else {
                next();
            }

        };

    };

})();


