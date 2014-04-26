var express = require('express');
var router = express.Router();

/*global require: false, module:false */

(function() {

    "use strict";

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'BizRez Assignment Worklist ' });
});




module.exports = router;

})();
