//     http://www.bizrez.com
//     (c) 2004-2014 David Mallon
//     Freely distributed under the MIT license.

/*global require: false, module: false */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var assignmentSchema= new Schema({

    orgUnit: { type: String, required: true },
    ownerId: { type: String, required: true },
    isPerson: { type: Boolean, required: true },
    objectType: { type: String, required: true },
    status: { type: String, required: true },
    statusInfo: String,
    priority: { type: Number, min: 0, max: 100 },
    createDate:{ type: Date, default: Date.now },
    completionDate: Date,
    goalDate: { type: Date, default: Date.now },
    deadlineDate: { type: Date, default: Date.now },
    header: Schema.Types.Mixed,
    headerDescription: String,
    body: Schema.Types.Mixed,
    bodyDescription: String,
    deeplink: String

});

module.exports = mongoose.model('assignment', assignmentSchema);


