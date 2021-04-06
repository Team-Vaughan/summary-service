// need to get query functions from DB
const { insertNewSummaryInfo, getRoomSummary } = require('../../database/crudOperations.js');
const db = require('../../database/postgresDB.js');


const addSummaryInfoToRoom = (req, res) => {
  //needs to check that body contains every field needed
  req.body.numBeds === undefined ? req.body.numBeds = "": req.body.numBeds;

  req.body.numBedrooms === undefined ? req.body.numBedrooms = "":req.body.numBedrooms;

  req.body.numBaths === undefined ? req.body.numBaths = "" :req.body.numBaths;

  req.body.numGuests === undefined ? req.body.numGuests = "" : req.body.numGuests;

  req.body.typeOfStay === undefined ? req.body.typeOfStay = "" : req.body.typeOfStay;

  req.body.hostName === undefined ? req.body.hostName = "" : req.body.hostName;

  //call query function to insert new data with req.body
   if (!req.body.stayId) {
     res.status(500).send('No stayId inserted');
   } else {
     insertNewSummaryInfo(req.body, (result) => {
       res.sendStatus(result);
     });
   }
  }

  const getSummaryInfo = (req, res) => {
    let roomId = req.params.id;
    if (roomId < 0) {
       res.status(500).send('StayId is not a valid id');
    }
  //call query function to find data
    getRoomSummary(roomId, (data, err) => {
      if(data === null) {
        res.sendStatus(err);
      } else {
        res.status(200).send(data);
      }
    });
  }

module.exports = {
  addSummaryInfoToRoom,
  getSummaryInfo
}