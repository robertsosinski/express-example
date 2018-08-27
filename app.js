var createError = require('http-errors');
var express = require('express');
var proxy = require('express-http-proxy');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', require('./src/routes/index'));
app.use('/tasks', require('./src/routes/tasks'));
app.use('/users', require('./src/routes/users'));

app.use('/assets', proxy('localhost:8080', {
  proxyReqPathResolver: function(req) {
    return '/assets' + require('url').parse(req.url).path;
  }
}));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, _next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
