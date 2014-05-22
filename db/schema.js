//     http://www.bizrez.com
//     (c) 2004-2014 David Mallon
//     Freely distributed under the MIT license.


/*global require: false, module: false, model: false, console: false*/

(function (app) {

    "use strict";

    var config = require('./../config.json');

    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;

    var ObjectId = Schema.ObjectId;

    var StatusSchema = new Schema({

        org: { type: String, index: true, required: true },          // Organization
        div: { type: String, index: true, required: true},           // Division
        unit: { type: String, index: true, required: true},          // Unit
        ownerId: { type: String, index: true, required: true },      // Person, System
        isPerson: { type: Boolean, required: true },    // Does this assignment belong to a person
        assignmentType: {type: String, required: true}, // Work, Process, Task, Log, ...
        status: { type: String, required: true },       // New, Open, Closed, Removed
        statusInfo: String,                             // General Hints
        priority: { type: String, required: true },     // 0 - 100
        createDate: { type: Date, default: Date.now },  // Creation Date
        completionDate: Date,                           // Completion Date
        goalDate: { type: Date, default: Date.now },    // Goal Date
        deadlineDate: { type: Date, default: Date.now },// Deadline Date
        header: {type: String, required: true},         // Header
        detail: {type: String, required: true},         // Detail
        deeplink: String                                // Deep Link to a page, url, application, view, ...

    });

    StatusSchema.index({ org: 1, div: 1, unit: 1, ownerId: 1 });
    StatusSchema.index({ org: 1, div: 1, unit: 1, ownerId: 1, status: 1, priority: 1 });

    var TokenSchema = new Schema({

        token: {type: String, required: true},
        ownerId: {type: String, require: true},
        refererUrl: {type: String, required: true}

    });

    mongoose.model('Status', StatusSchema);

})();





