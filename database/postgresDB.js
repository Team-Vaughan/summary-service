const { Pool, Client } = require('pg');
const pgtools = require('pgtools');

const config = {
  user: 'root',
  password: 'root',
  port: '5432',
  host: 'localhost'
}

pgtools.createdb(config, 'testdb1', (err, res) => {
  if (err) {
    console.error(err);
  } else {
    console.log('CREATED postgres db')
  }
})

// const connectionString= 'postgres://root:root@localhost:5432/test1';

// const client = new Client({
//   connectionString: connectionString
// });

// client.connect(err => {
//   if (err) {
//     console.error('connection error', err);
//   } else {
//     console.log('postgresDB connected')
//   }
// });