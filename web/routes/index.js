var express = require('express');
var router = express.Router();

var logz = function(req, res, next) {
  console.log('logging some cool stuff');
  next();
};

/* GET home page. */
router.get('/', logz, function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
