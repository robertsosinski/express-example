const path         = require('path');
const cookieParser = require('cookie-parser');

module.exports = function(app, express) {
  var webRoot = path.resolve(app.get('root'), '..', 'webpack-example');

  app.set('web', {
    root:     webRoot,
    env:      require(path.resolve(webRoot, 'config', 'env', `${app.get('env')}.json`)),
    manifest: require(path.resolve(webRoot, 'public', app.get('env'), 'manifest.json')) 
  });

  app.use(express.static(path.resolve(webRoot, 'public', app.get('env'))));

  app.set('views', path.resolve(app.get('root'), 'src', 'views'));
  app.set('view engine', 'pug');
  
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

  app.locals.config = {data: 'yes'};

  return app;
};