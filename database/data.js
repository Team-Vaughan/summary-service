const testdb = require('./couchDB.js');

const nano = require('nano')('http://admin:123456@localhost:5984');

nano.db.create('testcouchdb');


const createCouchdb = async () => {
  await nano.db.destroy('testcouchdb')
  await nano.db.create('testcouchdb')
  console.log('Couch is created for testing seed');
  const testcouchdb = await nano.use('testcouchdb')
  return testcouchdb
};


const allRecords = [];

var randomIntLessThan = (input) => {
  return Math.floor(Math.random() * input);
}

const PARTY_MODE = true;

 const stayTypes = PARTY_MODE ?
 ['Entire home', 'Private room', 'Treehouse', 'Entire bungalow', 'Entire camper', 'Studio apartment', 'Entire cabin', 'Private loft', 'Empty lot', 'Entire guest suite', 'Entire guesthouse', 'Entire condominium', 'Tiny house', 'Spy mansion', 'Haunted house', 'Bomb shelter', 'Bunkbed fort', 'Entire spacious trunk of car', 'Medieval castle', 'Entire Spice Bus', 'Airplane']
 :
 ['Entire home', 'Private room', 'Treehouse', 'Entire bungalow', 'Entire camper', 'Studio apartment', 'Entire cabin', 'Private loft', 'Empty lot', 'Entire guest suite', 'Entire guesthouse', 'Entire condominium', 'Tiny house'];

const numBathsTypes = [0, 1, 1.5, 2, 2.5];

//Create 100 Stay Summaries
for (var i = 0; i < 100; i++) {
 var thisStayObj = {};

 thisStayObj.numBedrooms = 1 + randomIntLessThan(5);
 thisStayObj.numBeds = 1 + thisStayObj.numBedrooms * randomIntLessThan(3);
 thisStayObj.numBaths = numBathsTypes[randomIntLessThan(numBathsTypes.length)];
 thisStayObj.numGuests = thisStayObj.numBeds * (randomIntLessThan(2) + 1);
 thisStayObj.typeOfStay = stayTypes[randomIntLessThan(stayTypes.length)];
 thisStayObj.stayId = i + 100;
allRecords.push(thisStayObj);
};


if (process.env.DATABASE === 'couchdb') {

};


console.log(allRecords);
