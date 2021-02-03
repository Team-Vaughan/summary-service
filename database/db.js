var {StaySummary} = require('./dbStart.js');

const TEST_MODE = false;

var getSummaryInfo;

if (TEST_MODE) {

  getSummaryInfo = (id, cb) => {
    cb(null, {
      numBeds: 2,
      numBedrooms: 2,
      numBaths: 1.5,
      numGuests: 4,
      typeOfStay: 'Entire house'
    });
  }
} else {
  getSummaryInfo = (id, cb) => {
    console.log('hihi');
    StaySummary.find({stayId: id}, (err, summary) => {
      if (err) {
        console.log(err);
        cb(err);
      } else {
        //console.log(summary);
        cb(null, summary[0]._doc);
      }
    })
  }
}

module.exports = {
  getSummaryInfo
};