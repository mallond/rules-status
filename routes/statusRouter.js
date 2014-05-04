//     http://www.bizrez.com
//     (c) 2004-2014 David Mallon
//     Freely distributed under the MIT license.

/*global next: false, console: false, config: false, require: false*/

(function () {

    "use strict";

    var security = require('../security');
    var config = require('../config');
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

    // Paginate list
    var doPaginate = function(req, res, query, pageNumber) {

        query = query || {};
        pageNumber = pageNumber || 1;

        Status.paginate(query, pageNumber, config.pageSize, function (error, pageCount, paginatedResults, itemCount) {
            if (error) {
                console.error(error);
            } else {
                res.json(paginatedResults);
            }
        });

    };

    // Router wrapper for paginate
    router.paginate = function (req, res) {

        doPaginate(req, res, {}, 1);

    };

    // Create Status
    router.create = function (req, res) {

        new Status({

            org: 'bizrez',
            div: 'lasVegas',
            unit: 'dev',
            ownerId: 'John',
            isPerson: true,
            assignmentType: 'Task',
            status: 'New',
            statusInfo: 'Testing this ',
            priority: 1,   // 0 - 100
            createDate: Date.now(),
            completionDate: Date.now(),
            goalDate: Date.now(),
            deadlineDate: Date.now(),
            header: {header: 1},
            headerDescription: 'Testing this header',
            body: {body: 1},
            bodyDescription: 'Testing this body',
            deeplink: 'http://www.bizrez.com'

        }).save(function (err, assignment, count) {

                if (err) return next(err);
                res.json({ok: count, id: assignment._id});
            });

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
