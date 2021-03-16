//This file is used for creating a new postgres database

const { Pool, Client } = require('pg');
const pgtools = require('pgtools');

const config = {
  user: 'root',
  password: 'root',
  port: '5432',
  host: 'localhost'
}

//drop database
pg.dropdb(config, 'testdb1', (err, res) => {
  if (err) {
    console.error(err);
  }
})

//create new database
pgtools.createdb(config, 'testdb1', (err, res) => {
  if (err) {
    console.error(err);
  } else {
    console.log('CREATED postgres db')
  }
})

