// need to get query functions from DB
const { insertNewSummaryInfo } = require('../../database/crudOperations.js');
const db = require('../../database/postgresDB.js');


const addSummaryInfoToRoom = (req, res) => {
  console.log(req.body);
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
       console.log('here!!', result)
       res.sendStatus(result);
     });
   }

  //if err send response 500
  //else res should send 200 back to client

}

module.exports = {
  addSummaryInfoToRoom
}