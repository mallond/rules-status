//     http://www.bizrez.com
//     (c) 2004-2014 David Mallon
//     Freely distributed under the MIT license.

/*global require: false, module: false, exports: false, console: false, next: false*/


(function () {

    "use strict";

    var mongoose = require('mongoose');
    var config = require('../config');
    var Status = mongoose.model('Status');
    var mongoosePg = require('mongoose-paginate');

    // Paginate list
    exports.statusPaginate = function (req, res, query, pageNumber) {

        query = query || {};
        pageNumber = pageNumber || 1;

        // prototype 'pageinate' from mongoose-paginate
        Status.paginate(query, pageNumber, config.pageSize, function (error, pageCount, paginatedResults, itemCount) {
            if (error) {
                console.error(error);
            } else {
                var data = {};
                data.ok = 1;
                data.paginatedResults = paginatedResults;
                data.itemCount = itemCount;
                res.json(data);

            }
        });

    };

    // Create
    exports.statusCreate = function (data, req, res) {

        new Status({

            org: data.org || 'test_org',
            div: data.div || 'test_div',
            unit: data.unit || 'test_unit',
            ownerId: data.user,
            isPerson: data.person || true,
            assignmentType: data.type || 'Test Assignment Type',
            status: data.status || 'Test Status',
            statusInfo: data.statusInfo || 'Test Status Info ',
            priority: data.priority || 10,   // 0 - 100
            createDate: data.createDate || Date.now(),
            completionDate: data.completionDate || Date.now(),
            goalDate: data.goalDate || Date.now(),
            deadlineDate: data.deadlineDate || Date.now(),
            header: data.header || 'Test Header',
            detail: data.detail || 'Test Detail',
            deeplink: data.deepLink || 'http://www.bizrez.com'

        }).save(function (err, assignment, count) {

                if (err) {
                    return res.json({ok: 0, err: err});
                } else {
                    res.json({ok: 1, id: assignment._id});
                }

            });
    };

    // Read
    exports.statusRead = function (query, req, res) {

        var findIt = {ownerId: query.ownerId};
        var result = Status.find(findIt, function (err, status) {

            if (err) {
                res.json({ok: 0, err: err});
            } else {
                res.json({ok: 1, result: status});
            }
        });
    };

    // Update
    exports.statusUpdate = function (data, req, res) {

        var query = data.query;
        var update = data.update;



        Status.update(query, update, {}, function (err, status) {

            if (err) {
                res.json({ok: 0, err: err});
            } else {
                res.json({ok: 1, result: status});
            }

        });
        res.json({ok: 1});
    };

    // Unit testing only
    exports.purge = function (data) {

        // This is used for unit testing only -
        var result = Status.remove(data, function () {
            result = "";
        });
    };

})();

