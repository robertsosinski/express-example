const path         = require('path');
const cookieParser = require('cookie-parser');
// const createError  = require('http-errors');

module.exports = function(app, express) {
  var webRoot = path.resolve(app.get('root'), '..', 'webpack-example');

  app.set('web', {
    root:     webRoot,
    app:      require(path.resolve(webRoot, 'config', 'app.json')),
    env:      require(path.resolve(webRoot, 'config', 'env', `${app.get('env')}.json`)),
    manifest: require(path.resolve(webRoot, 'public', app.get('env'), 'manifest.json')) 
  });

  // app.use(express.static('assets', path.resolve(webRoot, 'public', app.get('env'))));

  app.set('views', path.resolve(app.get('root'), 'src', 'views'));
  app.set('view engine', 'pug');
  
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

  app.locals.config = {data: 'yes'};

  // app.use(function(req, res, next) {
  //   next(createError(404));
  // });

  return app;
};