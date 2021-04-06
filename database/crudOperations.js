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
      //should return 500 for an error or if the record is a duplicate (stayId already in use)
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

//read
const getRoomSummary = async (id, cb) => {
  let roomId = id;

  const summaryData = await summaries.findOne({
   where: {"stayId": roomId}
  })

  if (summaryData === null) {
    cb(null, 500)
  } else {
    let hostId = summaryData.dataValues.hostId;
    let summaryObj = summaryData.dataValues;

    const hostData = await hosts.findOne({
      where: {"id": hostId}
    })

    const host = hostData.dataValues.hostName;
    summaryObj.hostName = host;

    const summaryInfo = {};
    summaryInfo.stayId = summaryObj.stayId;
    summaryInfo.numBeds = summaryObj.numBeds;
    summaryInfo.numBaths = summaryObj.numBaths;
    summaryInfo.numBedrooms = summaryObj.numBedrooms;
    summaryInfo.numGuests = summaryObj.numGuests;
    summaryInfo.typeOfStay = summaryObj.typeOfStay;
    summaryInfo.hostName = summaryObj.hostName;
    cb(summaryInfo, 200);
  }
}

//update
const updateRoomInfo =  async (id, info, cb) => {
  let stayId =id;
  let newRoomInfo = info;
  const roomSummary = await summaries.findOne({ where: {"stayId": stayId}})
  if (roomSummary) {
    roomSummary.update(newRoomInfo)
    cb(200);
  } else {
    cb(500);
  }
}

module.exports = {
  insertNewSummaryInfo,
  getRoomSummary,
  updateRoomInfo
}