// const NodeCouchDb = require('node-couchdb');

// const couch = new NodeCouchDb({
//   auth: {
//     user: 'admin',
//     password: '123456'
//   }
// })

// const dbName = 'testdb';

// couch.dropDatabase(dbName).then(() => {

// })

// couch.createDatabase(dbName).then(() => {
//   console.log('couchdb created')
// }, err => {
//   console.log(err)
// })

// couch.listDatabases().then((dbs) => {
//   console.log('here dbs', dbs);
// })


// const viewUrl = '_design/view1/_view/id?include_docs=true';


// //able to get records from test database
// let getCouchDBRecords = couch.get(dbName, viewUrl).then(({data}) => {
//   console.log(data.rows[0].doc)
// }, err => {
//   console.log('error');
// })

// //able to insert item into db
// // need to insert all data into db
// // if error call cb with error 404
// //else call cb with successful 200

// let insertIntoCouchDB = (info, cb) => {
//   couch.insert(dbName, {
//   info
// }).then(({data}) => {
//   console.log(data)
//   cb(200);
// }, err => {
//   console.log(err);
//   cb(404);
// });
// };

// module.exports = {
//   insertIntoCouchDB,
//   getCouchDBRecords
// }
