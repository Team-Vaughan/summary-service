const NodeCouchDb = require('node-couchdb');

const couch = new NodeCouchDb({
  auth: {
    user: 'admin',
    password: 'AcM!lan21'
  }
})

couch.listDatabases().then((dbs) => {
  console.log('here dbs', dbs);
})

const dbName = 'testdb';
const viewUrl = '_design/view1/_view/id?include_docs=true';


//able to get records from test database
let getCouchDBRecords = couch.get(dbName, viewUrl).then(({data}) => {
  console.log(data.rows[0].doc)
}, err => {
  console.log('errror');
})

//able to insert item into db
// need to insert all data into db
// if error call cb with error 404
//else call cb with successful 200

let insertIntoCouchDB = (info, cb) => {
  couch.insert(dbName, {
  "StayId": stayid
}).then(({data}) => {
  console.log(data)
}, err => {
  console.log(err);
});
};

module.exports = {
  insertIntoCouchDB,
  getCouchDBRecords
}
