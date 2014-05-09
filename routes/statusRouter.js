//     http://www.bizrez.com
//     (c) 2004-2014 David Mallon
//     Freely distributed under the MIT license.

/*global module: false,  next: false, console: false, config: false, require: false*/

(function () {

    "use strict";

    var security = require('../security/security');
    var config = require('../config');
    var action = require('../db/action');
    var express = require('express');
    var router = express.Router();
    var mongoose = require('mongoose');
    var Status = mongoose.model('Status');
    var jwt = require('jwt-simple');
    var mongoosePg = require('mongoose-paginate');


    // Return security token from Security
    router.getToken = function (req, res) {

        security.getToken(req, res);

    };

    // Authenticate request
    router.authenticate = function(req, res, next) {
        security.authenticate(req, res, next);

    };


    // Router wrapper for paginate
    router.paginate = function (req, res) {

        //doPaginate(req, res, {}, 1);
        action.statusPaginate(req, res, {}, 1);

    };

    // Create Status
    router.create = function (req, res) {

        var data = req.query.body || req.body;

        //create status
        action.statusCreate(data, req, res);

    };

    // Read
    router.read = function (req, res) {

        res.json({ok: 1, read: 1});
    };

    // Update
    router.update = function (req, res) {

        res.json({ok: 1, update: 1});

    };

    // Delete
    router.delete = function (req, res) {

        res.json({ok: 1, delete: 1});

    };

    // Export this module router
    module.exports = router;

    console.log('status.js has been required');

})();
