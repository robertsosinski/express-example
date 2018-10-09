const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

module.exports = function(app) {
  let db = {};
  let sequelize = new Sequelize(app.get('database'));
  let modelPath = path.resolve(app.get('root'), 'src', 'models');

  fs
    .readdirSync(modelPath)
    .filter(file => {
      return (file.indexOf('.') !== 0) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
      const model = sequelize['import'](path.join(modelPath, file));
      db[model.name] = model;
    });

  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  db.Sequelize = Sequelize;
  db.sequelize = sequelize;

  app.set('sequelize', db);

  return app;
};
