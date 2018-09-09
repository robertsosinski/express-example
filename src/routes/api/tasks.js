var express = require('express');
var router = express.Router();

module.exports = function(db) {
  router.get('/', function(req, res) {
    var Task = db.Task;

    Task.findAll().then(function(tasks) {
      res.json({data: tasks});
    });
  });

  return router;
};
