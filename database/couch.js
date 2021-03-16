const nano = require('nano')('http://admin:123456@localhost:5984');


const createCouchdb = async () => {
  await nano.db.destroy('test3')
  await nano.db.create('test3')
  console.log('Couch is created');
  const couchDB = await nano.use('test3')
  return couchDB
};

let insertIntoCouchDB = async (info, cb) => {
  console.log(info)
  let couch = await createCouchdb();
  await couch.insert(info)
  .then((data) => {
    console.log(data);
  cb(200);
}, err => {
  console.log(err);
  cb(404);
});
};

module.exports = {
  createCouchdb,
  insertIntoCouchDB
};