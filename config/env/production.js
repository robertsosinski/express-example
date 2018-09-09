const logger = require('morgan');

module.exports = function(app, _express) {
  app.use(logger('combined'));

  app.set('sequelize', {
    username: 'postgres',
    password: process.env.DBPASSWD,
    database: 'express_example_development',
    host: 'localhost',
    dialect: 'postgres'
  });

  return app;
};