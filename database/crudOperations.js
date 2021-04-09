//need to import models into this file
const {summaries, hosts} = require('./postgresSchema.js');
const { Sequelize} = require('sequelize');

const insertNewSummaryInfo = async (summaryInfo, cb) => {
  //summaryBody should include everything except hostName
  let summaryBody = {...summaryInfo};
  delete summaryBody.hostName;
  //hostBody should include only hostName
  let hostBody = {};
  hostBody.hostName = summaryInfo.hostName;
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

const getRoomSummary = async (id, cb) => {
  let roomId = id;

  summaries.findAll({where: {stayId: roomId}, include: [hosts]})
    .then(summary => {
      let summaryObj = summary[0].dataValues;
      const summaryInfo = {};
      summaryInfo.stayId = summaryObj.stayId;
      summaryInfo.numBeds = summaryObj.numBeds;
      summaryInfo.numBaths = summaryObj.numBaths;
      summaryInfo.numBedrooms = summaryObj.numBedrooms;
      summaryInfo.numGuests = summaryObj.numGuests;
      summaryInfo.typeOfStay = summaryObj.typeOfStay;
      summaryInfo.hostName = summaryObj.host.hostName;
      cb(summaryInfo, 200);
    })
    .catch(console.error);
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

const deleteRoomSummary = async (id, cb) => {
  let stayId = id;

  const roomSummaries = await summaries.findAll({ where: {"stayId": stayId}});
  if (!roomSummaries) {
    cb(500);
  } else {
    roomSummaries.forEach(summary => {
      summary.destroy();
      cb(200);
    });
  }
}

module.exports = {
  insertNewSummaryInfo,
  getRoomSummary,
  updateRoomInfo,
  deleteRoomSummary
}