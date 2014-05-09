//     http://www.bizrez.com
//     (c) 2004-2014 David Mallon
//     Freely distributed under the MIT license.

/*global require: false, module: false, exports: false, console: false, next: false*/


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
    exports.statusCreate = function(data, req, res, next) {

        new Status({

            org: 'bizrez',
            div: 'lasVegas',
            unit: 'dev',
            ownerId: data.user,
            isPerson: true,
            assignmentType: 'Task',
            status: data.status,
            statusInfo: 'Testing this ',
            priority: 1,   // 0 - 100
            createDate: Date.now(),
            completionDate: Date.now(),
            goalDate: Date.now(),
            deadlineDate: Date.now(),
            header: {header: data.header},
            headerDescription: 'Testing this header',
            body: {body: data.body},
            bodyDescription: 'Testing this body',
            deeplink: 'http://www.bizrez.com'

        }).save(function (err, assignment, count) {

                console.log(assignment);


                if (err) {return next(err);}

                res.json({ok: count, id: assignment._id});

            });
    };




})();

