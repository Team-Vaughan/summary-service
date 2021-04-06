//need to import models into this file
const {summaries, hosts} = require('./postgresSchema.js');

const insertNewSummaryInfo = async (summaryInfo) => {
  //should recieve json
  //summaryBody should include everything except hostName
  let summaryBody = {...summaryInfo};
  delete summaryBody.hostName;
  //hostBody should include only hostName
  let hostBody = {};
  hostBody.hostName = summaryInfo.hostName;
  // hostBody.hostName = summaryInfo.hostName;
  // //first need to add hostName to hosts model
  hosts.create(hostBody)
   .then((host) => {
     console.log(host);
     let hostId =  host.dataValues.id;
     summaryBody.hostId = hostId;
     console.log('right here now', summaryBody)
     summaries.create(summaryBody)
   })
   .catch((err) => {
     console.log(err);
   })
  // summaries.create(summaryBody)
  //   .then((result) => {
  //     console.log('here', result);
  //   })
  //   .catch((err) => {
  //     console.log(err)
  //   })
}

module.exports = {
  insertNewSummaryInfo,
}