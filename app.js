const path        = require('path');
const express     = require('express');
const createError = require('http-errors');

var app = express();

app.set('root', path.resolve(__dirname));

app.set('database', require(path.resolve(__dirname, 'config', 'database.js'))[app.get('env')]);

app = require(path.resolve(__dirname, 'config', 'app'))(app, express);
app = require(path.resolve(__dirname, 'config', 'env', app.get('env')))(app, express);
app = require(path.resolve(__dirname, 'config', 'sequelize'))(app);

app.use(express.static(path.resolve(app.get('root'), 'public')));

app.use('/',          require('./src/routes/index'));
app.use('/web',       require('./src/routes/web/index'));
app.use('/api/tasks', require('./src/routes/api/tasks')(app.get('sequelize')));
app.use('/api/users', require('./src/routes/api/users'));

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, _next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = app.get('env') === 'production' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
