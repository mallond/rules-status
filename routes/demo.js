/*global require: false, module: false */

var express = require('express');

var router = express.Router();

var mongoose = require( 'mongoose' );
var Assignment = mongoose.model( 'Assignment' );


/* GET home page. */
router.get('/demo', function(req, res) {
  res.render('demo', { title: 'Express' });
});



module.exports = router;
