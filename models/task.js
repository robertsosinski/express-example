module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    title: DataTypes.STRING
  }, {
    tableName: 'tasks',
    underscored: true
  });

  Task.associate = function(_models) {
    // associations can be defined here
  };

  return Task;
};