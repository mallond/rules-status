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
    log.info('token.js - Logger Set');

    // User has already been authenticated - now he/she has a token to visit this site
    // Did not want to use cookie based authentication - we would have to create a cookie for each unique path

    exports.getToken = function (req, res) {

        var name = req.query.name;

        // Hack User always has a match - demo only
        var isMatch = true;

        if (isMatch) {

            // Great, user has successfully authenticated, so we can generate and send them a token.
            var expires = moment().add('days', config.tokenKeepAlive).valueOf();

            var token = jwt.encode(
                {
                    iss: name,
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




