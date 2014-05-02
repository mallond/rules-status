//     http://www.bizrez.com
//     (c) 2004-2014 David Mallon
//     Freely distributed under the MIT license.


/*global exports: false, console:false, require: false  */

(function () {

    "use strict";

    var jwt = require('jwt-simple');
    var moment = require('moment');
    var config = require('./config.json');

    exports.cors = function (req, res, next) {


        res.setHeader('Cache-Control', 'private, no-cache');
        res.setHeader('X-xss-protection', '1; mode=block');
        res.setHeader('X-content-type-options', 'nosniff');
        res.setHeader('X-frame-options', 'DENY');

        res.header('Access-Control-Allow-Origin', req.headers.origin);
        res.header('Access-Control-Allow-Methods', ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS']);
        res.header('Access-Control-Allow-Max-Age', 14400);
        res.header('Access-Control-Allow-Header', 'Origin, X-Requested-With, Content-Type, Accept');

        next();
    };

    exports.authenticate = function (req, res, next) {

        var token = req.body.token;

        var decoded = jwt.decode(token, config.tokenKey);

        if (token && decoded.iss) {
            next();
        } else {
            res.end('Not authorized', 401);
        }

    };

    // User has already been authenticated - now he/she has a token to visit this site
    exports.getToken = function (req, res) {

        var name = req.query.name;

        // Hack User always has a match - demo only
        var isMatch = true;

        if (isMatch) {

            // Great, user has successfully authenticated, so we can generate and send them a token.
            var expires = moment().add('days', 1).valueOf();

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

            res.send('Authentication error', 401)
        }

    };

    console.log('security.js has been required');

})();


