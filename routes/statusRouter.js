//     http://www.bizrez.com
//     (c) 2004-2014 David Mallon
//     Freely distributed under the MIT license.

/*global next: false, console: false*/

(function () {

    "use strict";

    var security = require('../security');
    var express = require('express');
    var router = express.Router();
    var mongoose = require('mongoose');
    var Status = mongoose.model('Status');
    var jwt = require('jwt-simple');


    router.getToken = function(req, res) {

        security.getToken(req, res);

    };

    router.create = function (req, res) {

        new Status ({

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


    router.read = function (req, res) {

        var token = req.body.token;

        var decoded = jwt.decode(token, 'super secret 007');

        res.json({ok: 1, read: 1});
    };

    router.update = function (req, res) {

        res.json({ok: 1, update: 1});

    };

    router.delete = function (req, res) {

        res.json({ok: 1, delete: 1});

    };


    router.demo = function (req, res) {

        res.render('demo', { title: 'BizAssign Demo' });

    };


    module.exports = router;

    console.log('status.js has been required');

})();
