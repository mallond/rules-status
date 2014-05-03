//     http://www.bizrez.com
//     (c) 2004-2014 David Mallon
//     Freely distributed under the MIT license.

/*global console: false, module: false*/

module.exports = function cors(req, res, next) {

    "use strict";

    console.log('in the cors about to return inner function');

    return function cors(req, res, next) {

        console.log('in the cors return');
        console.log(req.headers.origin);
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');

        next();

    };


};


