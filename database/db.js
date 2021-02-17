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
          cb(null, summary[0]._doc);
        }
      }
    })
  }
}

module.exports = {
  getSummaryInfo
};