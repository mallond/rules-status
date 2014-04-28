/*global require: false, module: false */

/*Global next: false, */

(function () {

    "use strict";

    var express = require('express');
    var router = express.Router();

    var mongoose = require('mongoose');
    var Status = mongoose.model('Status');


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

        res.json({ok: 1, read: 1});

    };

    router.update = function (req, res) {

        res.json({ok: 1, update: 1});

    };

    router.del = function (req, res) {

        res.json({ok: 1, delete: 1});
    };

    router.list = function (req, res) {

        res.json({ok: 1, list: 1});

    };


    router.demo = function (req, res) {

        res.render('demo', { title: 'BizAssign Demo' });

    };


    module.exports = router;

    console.log('status.js has been required');

})();
