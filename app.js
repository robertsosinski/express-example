const path    = require('path');
const express = require('express');

var app = express();

app.set('root', path.resolve(__dirname));

app = require(path.resolve(__dirname, 'config', 'app'))(app, express);
app = require(path.resolve(__dirname, 'config', 'env', app.get('env')))(app, express);

app.locals.config.web = {};
app.locals.config.web.env = require(path.resolve(__dirname, '..', 'webpack-example', 'config', 'env', `${app.get('env')}.json`));
app.locals.config.web.manifest = require(path.resolve(__dirname, '..', 'webpack-example', 'public', app.get('env'), 'manifest.json'));

app.use('/',          require('./src/routes/index'));
app.use('/web',       require('./src/routes/web/index'));
app.use('/api/tasks', require('./src/routes/api/tasks'));
app.use('/api/users', require('./src/routes/api/users'));

app.use(function(err, req, res, _next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = app.get('env') === 'production' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
