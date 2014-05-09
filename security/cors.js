//     http://www.bizrez.com
//     (c) 2004-2014 David Mallon
//     Freely distributed under the MIT license.

/*global console: false, module: false*/

(function () {

    "use strict";

    module.exports = function cors(req, res, next) {


        return function cors(req, res, next) {

            res.header('Access-Control-Allow-Origin', req.headers.origin);
            res.header('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');

            // Intercept OPTIONS method
            if (req.method === 'OPTIONS') {
                res.send(200);
            }
            else {
                next();
            }

        };

    };

    console.log('cors.js has been required');

})();


