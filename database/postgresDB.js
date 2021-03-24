const { Sequelize } = require('sequelize');

const db = new Sequelize({
  database: 'summary',
  username: 'root',
  password: 'root',
  dialect: 'postgres',
  port: 5432,
  host: 'localhost'
});

module.exports.db = db;


