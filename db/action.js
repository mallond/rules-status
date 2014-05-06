//     http://www.bizrez.com
//     (c) 2004-2014 David Mallon
//     Freely distributed under the MIT license.

/*global require: false, module: false, exports: false, console: false*/


(function() {

    "use strict";

    var mongoose = require('mongoose');
    var config = require('../config');
    var Status = mongoose.model('Status');
    var mongoosePg = require('mongoose-paginate');


    // Paginate list
    exports.statusPaginate = function(req, res, query, pageNumber) {

        query = query || {};
        pageNumber = pageNumber || 1;

        // prototype 'pageinate' from mongoose-paginate
        Status.paginate(query, pageNumber, config.pageSize, function (error, pageCount, paginatedResults, itemCount) {
            if (error) {
                console.error(error);
            } else {
                res.json(paginatedResults);
            }
        });

    };

    // Create
    exports.statusCreate = function(req, res) {

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




})();

