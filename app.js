var path = require('path');
var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var createError = require('http-errors');

var app = express();
var env = app.locals.settings.env;

var appRoot = path.resolve(__dirname);

app.locals.config = {};
app.locals.config.env = require(path.resolve(appRoot, 'config', 'env', `${env}.json`));
app.locals.config.express = require(path.resolve(appRoot, 'config', 'express.json'));

var webRoot = path.resolve(__dirname, '..', app.locals.config.express.webapp);

app.locals.config.web = {};
app.locals.config.web.env = require(path.resolve(webRoot, 'config', 'env', `${env}.json`));
app.locals.config.web.manifest = require(path.resolve(webRoot, 'public', env, 'manifest.json'));

app.set('views', path.resolve(appRoot, 'src', 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', require('./src/routes/index'));

app.use('/web', require('./src/routes/web/index'));

app.use('/api/tasks', require('./src/routes/api/tasks'));
app.use('/api/users', require('./src/routes/api/users'));

app.use(express.static(path.resolve(webRoot, 'public', env)));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, _next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = env === 'production' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
