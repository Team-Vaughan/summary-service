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
  let numBeds = info.numBeds;
  let numBedrooms = info.numBedrooms;
  let numBaths = info.numBaths;
  let numGuests = info.numGuests;
  let typeOfStay = info.typeOfStay;


  StaySummary.find({stayId: newStayId}, (err, summary) => {
    if (err) {
      console.log('Record already in database');
      cb(err, 404);
    } else if (summary.length > 0) {
      cb(err, 404);
    } else {
      StaySummary.create({stayId: newStayId, numBeds: numBeds, numBedrooms: numBedrooms, numBaths: numBaths, numGuests: numGuests, typeOfStay: typeOfStay}, (err, result) => {
        if (err) {
          console.log(err);
          cb(err, 404);
        } else {
          cb(null, 200);
        }
      })
    }
  })
}

let deleteSummary = (id, cb) => {
  StaySummary.deleteOne({stayId: id }, (err, result) => {
    if (err) {
      console.log(err);
      cb(err, 404);
    } else {
      cb(null, 200);
    }
  })
}

let updateSummary = (id, cb) => {
  console.log('here',id);
  let options = {useFindAndModify: true};
  StaySummary.findOneAndUpdate({stayId: id}, options, (err, result) => {
    if (err) {
      console.log(err);
      cb(err, 404);
    } else {
      cb(null, 200);
    }
  })
}

module.exports = {
  getSummaryInfo,
  insertNewSummary,
  deleteSummary,
  updateSummary
};