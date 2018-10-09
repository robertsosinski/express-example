module.exports = {
  development: {
    username: 'postgres',
    password: 'p4ssw0rd',
    database: 'express_example_development',
    host: 'localhost',
    dialect: 'postgres',
    seederStorageTableName: 'sequelize_data',
    migrationStorageTableName: 'sequelize_meta',
  },
  test: {
    username: 'postgres',
    password: 'p4ssw0rd',
    database: 'express_example_test',
    host: 'localhost',
    dialect: 'postgres',
    seederStorageTableName: 'sequelize_data',
    migrationStorageTableName: 'sequelize_meta',
  },
  production: {
    username: 'postgres',
    password: process.env.DBPASSWD,
    database: 'express_example_development',
    host: 'localhost',
    dialect: 'postgres',
    seederStorageTableName: 'sequelize_data',
    migrationStorageTableName: 'sequelize_meta',
  }
};