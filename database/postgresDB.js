const { Sequelize } = require('sequelize');

const db = new Sequelize({
  database: 'summary',
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  dialect: 'postgres',
  port: 5432,
  host: 'localhost'
});

module.exports.db = db;


