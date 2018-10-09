const logger = require('morgan');

module.exports = function(app, _express) {
  app.use(logger('dev'));

  return app;
};