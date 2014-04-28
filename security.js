//     http://www.bizrez.com
//     (c) 2004-2014 David Mallon
//     Freely distributed under the MIT license.

/*global exports: false, console:false  */

(function () {

    "use strict";

    exports.authenticate = function (req, res, next) {


        var sess = req.session;
        req.session.authenticated = true;

        // Session exist and user authenticated
        if (typeof req.session.user !== 'undefined' && req.session.user.authenticated === true) {
            console.log('yo go');
            next();
        } else {
            console.log('no go');
            authenticate(req, res, sess, next);
        }

    };

    var authenticate = function (req, res, sess, next) {

        //Hack Will Always create default user if none specified
        var name = req.body.name;
        var password = req.body.password;

        name = 'John';
        password = 'password';

        req.session.user = {name: name, authenticated: true};
        req.session.save(function (err) {
            // session saved
        });
        next();

    };

    console.log('security.js has been required');

})();


