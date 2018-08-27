var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('index/index', {title: 'ExpressLTE', env: {url: 'https://dev.url.com'}});
});

module.exports = router;
