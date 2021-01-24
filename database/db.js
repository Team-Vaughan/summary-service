
const TEST_MODE = true;

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
  getSummaryInfo = () => {
    //return something from database
  }
}

module.exports = {
  getSummaryInfo
};