//     http://www.bizrez.com
//     (c) 2004-2014 David Mallon
//     Freely distributed under the MIT license.
//     http://www.bizrez.com
//     (c) 2004-2014 David Mallon
//     Freely distributed under the MIT license.

/*global require: false, module: false, model: false */

(function () {

    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;
    var ObjectId = Schema.ObjectId;


    var Todo = new Schema({
        user_id: String,
        content: String,
        updated_at: Date
    });

    mongoose.model('Todo', Todo);

    var StatusSchema = new Schema({

        org: { type: String, required: true },          // Organization
        div: { type: String, required: true},           // Division
        unit: { type: String, required: true},          // Unit
        ownerId: { type: String, required: true },      // Person, System
        isPerson: { type: Boolean, required: true },    // Does this assignment belong to a person
        assignmentType: {type: String, required: true}, // Work, Process, Task, Log, ...
        status: { type: String, required: true },       // New, Open, Closed, Removed
        statusInfo: String,                             // General Hints
        priority: { type: Number, min: 0, max: 100 },   // 0 - 100
        createDate: { type: Date, default: Date.now },   // Creation Date
        completionDate: Date,                           // Completion Date
        goalDate: { type: Date, default: Date.now },    // Goal Date
        deadlineDate: { type: Date, default: Date.now },// Deadline Date
        header: Schema.Types.Mixed,                     // Header detail
        headerDescription: String,                      // Header description
        body: Schema.Types.Mixed,                       // Body detail
        bodyDescription: String,                        // Body description
        deeplink: String                                // Deep Link to a page, url, application, view, ...

    });

    mongoose.model('Status', StatusSchema);

    // DB Connect
    mongoose.connect('mongodb://localhost:27017/bizrez');
    console.log('mongoose connected');
    console.log('dao.js has been required');


})();




