var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    var test = 100;
    res.render('making',{test});
});

module.exports = router;
