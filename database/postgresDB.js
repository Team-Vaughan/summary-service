//This file is used for creating a new postgres database
const { Pool, Client} = require('pg');
const pgtools = require('pgtools');
const { Sequelize } = require('sequelize');

const config = {
  user: 'root',
  password: 'root',
  port: '5432',
  host: 'localhost'
}

//drop database
pgtools.dropdb(config, 'summary', (err, res) => {
  if (err) {
    console.error(err);
  }
  //create new database
  pgtools.createdb(config, 'summary', (err, res) => {
    if (err) {
      console.error(err);
    } else {
      console.log('CREATED postgres db')
    }
  })
})


const db = new Sequelize({
  database: 'summary',
  username: 'root',
  password: 'root',
  dialect: 'postgres',
  port: 5432,
  host: 'localhost'
});

module.exports.db = db;


