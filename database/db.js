var {StaySummary} = require('./dbStart.js');
require('dotenv');



var getSummaryInfo;

if (process.env.NODE_ENV === 'test') {

  getSummaryInfo = (id, cb) => {
    if (id >= 100 && id < 200) {
      cb(null, {
        numBeds: 2,
        numBedrooms: 2,
        numBaths: 1.5,
        numGuests: 4,
        typeOfStay: 'Entire house'
      });

    } else {
      cb(new Error('ID not in database'));
    }
  }
} else {
  getSummaryInfo = (id, cb) => {
    StaySummary.find({stayId: id}, (err, summary) => {
      if (err) {
        console.log(err);
        cb(err);
      } else {
        if(summary[0] === undefined) {
          cb(new Error('Could not find record in database'));
        } else {
          console.log('here', summary[0]._doc);
          cb(null, summary[0]._doc);
        }
      }
    })
  }
}

let insertNewSummary = (info, cb) => {
  // need to make sure stayId isn't already taken by another room
  let newStayId = info.stayId;
  StaySummary.find({stayId: newStayId}, (err, summary) => {
    if (err) {
      console.log(err);
      cb(err);
    } else if (summary.length > 0) {
      cb(err);
    } else {
      StaySummary.create({stayId: newStayId}, (err, test) => {
        console.log('right here', test._doc);
      })
    }
  })
  //input is body from a post request
  //should rec data that includes, stayId, typeOfStay, numGuests, numBaths, numBeds, numBedrooms
  // with mongoose model use insert query with data above
  // if err console log err
  //else send make response indicating data was successfully input into database
  //output is a successful callback to server
}

module.exports = {
  getSummaryInfo,
  insertNewSummary
};