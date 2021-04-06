//need to import models into this file
const {summaries, hosts} = require('./postgresSchema.js');

const insertNewSummaryInfo = async (summaryInfo, cb) => {
  //should recieve json
  //summaryBody should include everything except hostName
  let summaryBody = {...summaryInfo};
  delete summaryBody.hostName;
  //hostBody should include only hostName
  let hostBody = {};
  hostBody.hostName = summaryInfo.hostName;
  // //first need to add hostName to hosts model
  await hosts.create(hostBody)
   .then((host) => {
     let hostId =  host.dataValues.id;
     summaryBody.hostId = hostId;
    })
    .catch(err => {
      console.log(err);
      cb(500);
    })
   await summaries.create(summaryBody)
   .then((result) => {
     cb(200)
   })
   .catch((err) => {
     console.log(err);
     cb(500)
   })
}

module.exports = {
  insertNewSummaryInfo,
}