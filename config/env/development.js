const logger = require('morgan');

module.exports = function(app, _express) {
  app.use(logger('dev'));

  app.set('sequelize', {
    username: 'postgres',
    password: 'p4ssw0rd',
    database: 'express_example_development',
    host: 'localhost',
    dialect: 'postgres'
  });

  return app;
};