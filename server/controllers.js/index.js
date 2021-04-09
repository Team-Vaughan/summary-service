// need to get query functions from DB
const { insertNewSummaryInfo, getRoomSummary, updateRoomInfo, deleteRoomSummary } = require('../../database/crudOperations.js');
const db = require('../../database/postgresDB.js');


const addSummaryInfoToRoom = (req, res) => {
  //needs to check that body contains every field needed
  const expectedFields = {
    numBeds: 'Number',
    numBedrooms: 'Number',
    numBaths: 'Number',
    numGuests: 'Number',
    typeOfStay: 'String',
    hostName: 'String'
  }

  for (let field in expectedFields) {
    if (!req.body[field]) {
      res.status(500).send('Missing all needed room information')
    }
  }

  //call query function to insert new data with req.body
   if (!req.body.stayId) {
     res.status(500).send('No stayId inserted');
   } else {
     insertNewSummaryInfo(req.body, (result) => {
       res.sendStatus(result);
     });
   }
  }

  const getRoomSummaryInfo = (req, res) => {
    let roomId = req.params.id;
    if (roomId < 0 || !roomId) {
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

  const updateRoomSummary = (req, res) => {
    let roomId = req.params.stayId;
    let roomInfo = req.body;
    if (roomId < 0 || !roomId) {
      res.sendStatus(500);
    } else {
      updateRoomInfo(roomId, roomInfo, (result) => {
        res.sendStatus(result);
      });
    }
  }

const deleteRoomInfo = (req, res) => {
  let roomId = req.params.stayId
  if (roomId < 0 || !roomId) {
    res.status(500).send('Invalid room ID');
  } else {
    deleteRoomSummary(roomId, (result) => {
      res.sendStatus(result);
    })
  }
}

module.exports = {
  addSummaryInfoToRoom,
  getRoomSummaryInfo,
  updateRoomSummary,
  deleteRoomInfo
}