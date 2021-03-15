const nano = require('nano')('http://admin:123456@localhost:5984');


const createCouchdb = async () => {
    await nano.db.destroy('testcouchdb')
    await nano.db.create('testcouchdb')
    console.log('Couch is created for testing seed');
    const testcouchdb = await nano.use('testcouchdb')
    created = true;
    return testcouchdb
};


// const allRecords = [];

var randomIntLessThan = (input) => {
  return Math.floor(Math.random() * input);
}

const PARTY_MODE = true;

 const stayTypes = PARTY_MODE ?
 ['Entire home', 'Private room', 'Treehouse', 'Entire bungalow', 'Entire camper', 'Studio apartment', 'Entire cabin', 'Private loft', 'Empty lot', 'Entire guest suite', 'Entire guesthouse', 'Entire condominium', 'Tiny house', 'Spy mansion', 'Haunted house', 'Bomb shelter', 'Bunkbed fort', 'Entire spacious trunk of car', 'Medieval castle', 'Entire Spice Bus', 'Airplane']
 :
 ['Entire home', 'Private room', 'Treehouse', 'Entire bungalow', 'Entire camper', 'Studio apartment', 'Entire cabin', 'Private loft', 'Empty lot', 'Entire guest suite', 'Entire guesthouse', 'Entire condominium', 'Tiny house'];

const numBathsTypes = [0, 1, 1.5, 2, 2.5];

const seedDB = async (records, dbname) => {
  const allRecords = [];
  let count = 0;
let batchCount = 0;
let batch = [];

while (records !== 0) {
 var thisStayObj = {};

 thisStayObj.numBedrooms = 1 + randomIntLessThan(5);
 thisStayObj.numBeds = 1 + thisStayObj.numBedrooms * randomIntLessThan(3);
 thisStayObj.numBaths = numBathsTypes[randomIntLessThan(numBathsTypes.length)];
 thisStayObj.numGuests = thisStayObj.numBeds * (randomIntLessThan(2) + 1);
 thisStayObj.typeOfStay = stayTypes[randomIntLessThan(stayTypes.length)];
 thisStayObj.stayId = count + 100;
 count++;
  batch.push(thisStayObj);
  batchCount++;
  if (batchCount === 1000) {
    allRecords.push(batch);
    batch = [];
    batchCount = 0;
  }
  records--;
};

if (batch.length > 0) {
  allRecords.push(batch);
}

  const insertRecords = async (dataBase, batch) => {
   await dataBase.bulk(batch);
  }

  // console.log(allRecords);
  for (let j = 0; j < allRecords.length; j++) {
    let objOfRecords = {};
    objOfRecords.docs = allRecords[j];
    await insertRecords(dbname, objOfRecords)
};
};


//this will seed 9M records
let seedDATABASE = async () => {
  const testcouch = await createCouchdb();
   await seedDB(1000000, testcouch);
   await seedDB(1000000, testcouch);
   await seedDB(1000000, testcouch);
   await seedDB(1000000, testcouch);
   await seedDB(1000000, testcouch);
   await seedDB(1000000, testcouch);
   await seedDB(1000000, testcouch);
   await seedDB(1000000, testcouch);
   await seedDB(1000000, testcouch);
   await seedDB(1000000, testcouch);
}


if (process.env.DATABASE === 'couchdb') {
  seedDATABASE();
};


// console.log(allRecords);
