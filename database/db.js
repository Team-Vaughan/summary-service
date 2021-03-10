const {StaySummary} = require('./dbStart.js');
require('dotenv').config();
const {StaySummaryTest} = require('./mockDatabase.js');

var getSummaryInfo;

let SummaryModel = StaySummary;

if (process.env.ENV === 'test') {

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
          cb(null, summary[0]._doc);
        }
      }
    })
  }
}

if (process.env.ENV === 'test') {
   SummaryModel = StaySummaryTest;
}

let insertNewSummary = (info, cb) => {
  // need to make sure stayId isn't already taken by another room
  let {
    stayId,
    numBeds,
    numBedrooms,
    numBaths,
    numGuests,
    typeOfStay
  } = info;


  SummaryModel.find({stayId: stayId}, (err, summary) => {
    if (err) {
      console.log('Record already in database');
      cb(err, 404);
    } else if (summary.length > 0) {
      cb(err, 404);
    } else {
      SummaryModel.create({stayId, numBeds, numBedrooms, numBaths, numGuests, typeOfStay}, (err, result) => {
        if (err) {
          cb(err.message, 404);
        } else {
          cb(null, 200);
        }
      })
    }
  })
}

let deleteSummary = (id, cb) => {
  SummaryModel.deleteOne({stayId: id }, (err, result) => {
    if (err) {
      cb(err.message, 404);
    } else {
      cb(null, 200);
    }
  })
}

let updateSummary = (id, cb) => {
  let options = {useFindAndModify: true};
  SummaryModel.findOneAndUpdate({stayId: id}, options, (err, result) => {
    if (err) {
      cb(err.message, 404);
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