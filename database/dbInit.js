const {NUMBER_OF_STAYS, StaySummary} = require('./dbStart.js');
const {StaySummaryTest} = require('./mockDatabase.js');
require('dotenv').config();
const testdb = require('./couchDB.js');
const NodeCouchDb = require('node-couchdb');

const testCouch = new NodeCouchDb({
  auth: {
    user: 'admin',
    password: 'AcM!lan21'
  }
})

testCouch.listDatabases().then((dbs) => {
  console.log('here dbs', dbs);
})
const dbName = 'testdb';
const viewUrl = '_design/view1/_view/id?include_docs=true';

const PARTY_MODE = true;

let newModel = StaySummary;



var randomIntLessThan = (input) => {
  return Math.floor(Math.random() * input);
}

console.log('Deleting existing entries...')
StaySummary.deleteMany({}, (err, result) => { //clear existing database
  if (err) {
    console.log(err);
  } else {
    console.log(result);
    const stayTypes = PARTY_MODE ?
      ['Entire home', 'Private room', 'Treehouse', 'Entire bungalow', 'Entire camper', 'Studio apartment', 'Entire cabin', 'Private loft', 'Empty lot', 'Entire guest suite', 'Entire guesthouse', 'Entire condominium', 'Tiny house', 'Spy mansion', 'Haunted house', 'Bomb shelter', 'Bunkbed fort', 'Entire spacious trunk of car', 'Medieval castle', 'Entire Spice Bus', 'Airplane']
      :
      ['Entire home', 'Private room', 'Treehouse', 'Entire bungalow', 'Entire camper', 'Studio apartment', 'Entire cabin', 'Private loft', 'Empty lot', 'Entire guest suite', 'Entire guesthouse', 'Entire condominium', 'Tiny house'];

    const numBathsTypes = [0, 1, 1.5, 2, 2.5];

    //Create 100 Stay Summaries
    for (var i = 0; i < NUMBER_OF_STAYS; i++) {
      var thisStayObj = {};

      thisStayObj.numBedrooms = 1 + randomIntLessThan(5);
      thisStayObj.numBeds = 1 + thisStayObj.numBedrooms * randomIntLessThan(3);
      thisStayObj.numBaths = numBathsTypes[randomIntLessThan(numBathsTypes.length)];
      thisStayObj.numGuests = thisStayObj.numBeds * (randomIntLessThan(2) + 1);
      thisStayObj.typeOfStay = stayTypes[randomIntLessThan(stayTypes.length)];
      thisStayObj.stayId = i + 100;

      if (process.env.ENV === 'test') {
        newModel = StaySummaryTest;
      }
      var thisStay = new newModel(thisStayObj);

      testCouch.insert(dbName, thisStayObj).then(({data}) => {
        console.log('Inserting document', data)
      }, err => {
        console.log(err);
      });

      thisStay.save((err, stay) => {
        if (err) {
          console.log(err);
        } else {

          console.log(`Saved stayId ${stay.stayId} (${stay.stayId - 99} out of 100)`);
        }
      })
    }

  }
});


