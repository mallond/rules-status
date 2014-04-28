/*global require: false, module: false */

var express = require('express');

var router = express.Router();

var mongoose = require( 'mongoose' );
var Assignment = mongoose.model( 'Assignment' );


/* GET home page. */
router.get('/demo', function(req, res) {
  res.render('index', { title: 'Express' });
});


router.create = function ( req, res){

   new Assignment({

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
        header: {header:1},
        headerDescription: 'Testing this header',
        body: {body:1},
        bodyDescription: 'Testing this body',
        deeplink: 'http://www.bizrez.com'

    }).save( function ( err, assignment , count ){
            if( err ) return next( err );
            res.json({ok:count, id: assignment._id});
        });

};


module.exports = router;
