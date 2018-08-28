var express = require('express');
var router = express.Router();

var models = require('../../models');

router.get('/', function(req, res) {
  models.Task.findAll().then(function(tasks) {
    res.json({data: tasks});
  });
});

module.exports = router;
