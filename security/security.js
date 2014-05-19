//     http://www.bizrez.com
//     (c) 2004-2014 David Mallon
//     Freely distributed under the MIT license.


/*global exports: false, console:false, require: false  */

(function () {

    "use strict";

    var jwt = require('jwt-simple');
    var moment = require('moment');
    var config = require('./../config.json');
    var Log =  require('log');
    var log = new Log(config.logLevel);
    log.info('security.js - Logger Set');

    exports.authenticate = function (req, res, next) {



        var token = req.body.token || req.query.token;
        console.log('');
        log.debug('Authenticate token:'+ token);

        var decoded = jwt.decode(token, config.tokenKey);

        if (token && decoded.iss) {
            next();
        } else {
            res.end('Not authorized', 401);
        }

    };

    // User has already been authenticated - now he/she has a token to visit this site
    // Did not want to use cookie based authentication - we would have to create a cookie for each unique path

    exports.getToken = function (req, res) {

        var userId = req.query.userId || req.body.userId;

        log.debug("security.js - getToken - userId: " +userId);

        // Hack User always has a match - demo only
        // Also need to add a check for referrer
        var isMatch = true;

        if (isMatch) {

            // Great, user has successfully authenticated, so we can generate and send them a token.
            var expires = moment().add('days', 1).valueOf();

            var token = jwt.encode(
                {
                    iss: userId,
                    exp: expires
                },

                config.tokenKey
            );

            res.json({
                token: token
            });

        } else {
            res.send('Authentication error', 401);
        }

    };

})();


