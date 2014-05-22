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

    var Log = require('log');
    var log = new Log(config.logLevel);
    log.info('Status Router - Logger Set');

    // Return security token from Security
    router.getToken = function (req, res) {

        var ownerId = req.query.ownerId || req.body.ownerId;

        // Validate Id Passed
        req.checkBody('ownerId', 'Invalid Credential').isAlpha();
        var errors = req.validationErrors();
        if (errors) {
            res.json({
                error: errors[0]
            });
        } else {
            security.getToken(req, res);
        }

    };

    // Authenticate request
    router.authenticate = function (req, res, next) {

        security.authenticate(req, res, next);

    };

    // Router wrapper for paginate
    router.paginate = function (req, res) {

        var data = req.query.body || req.body;
        action.statusPaginate(req, res, {}, data.pageNumber);

    };

    // Create Status
    router.create = function (req, res) {

        var data = req.query.body || req.body;
        action.statusCreate(data, req, res);

    };

    // Read
    router.read = function (req, res) {

        var data = req.query.body || req.body;
        action.statusRead(data, req, res);

    };

    // Update
    router.update = function (req, res) {

        var data = req.query.body || req.body;
        action.statusUpdate(data, req, res);

    };

    // Export this module router
    module.exports = router;

})();
