var express = require('express');
var router = express.Router();

var models = require('../models');

router.get('/', function(req, res) {
  models.Task.findAll().then(function(tasks) {
    res.render('tasks/index', {tasks: tasks});
  });
});

module.exports = router;
