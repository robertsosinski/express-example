var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  // res.locals.web = {env: {env: 'test'}};
  res.render('web/index', {title: 'ExpressLTE', env: {url: 'https://dev.url.com'}});
});

module.exports = router;
