const nano = require('nano')('http://admin:123456@localhost:5984');
const faker = require('faker');

//database is summary
const createCouchdb = async () => {
    await nano.db.destroy('summary')
    await nano.db.create('summary')
    console.log('Couch is created for testing seed');
    const summaryDB = await nano.use('summary')
    return summaryDB
};


// const allRecords = [];

var randomIntLessThan = (input) => {
  return Math.floor(Math.random() * input);
}

//generate host names
const hostNames = [];
let numOfHostNames = 150;
const generateHostNames = (numOfHost) => {
  //this will generate 150 host names
  for (let i = 0; i < numOfHost; i++) {
    let randomName = faker.name.findName();
    hostNames.push(randomName);
  }
}
generateHostNames(numOfHostNames);


 const stayTypes = ['Entire home', 'Private room', 'Treehouse', 'Entire bungalow', 'Entire camper', 'Studio apartment', 'Entire cabin', 'Private loft', 'Empty lot', 'Entire guest suite', 'Entire guesthouse', 'Entire condominium', 'Tiny house', 'Spy mansion', 'Haunted house', 'Bomb shelter', 'Bunkbed fort', 'Entire spacious trunk of car', 'Medieval castle', 'Entire Spice Bus', 'Airplane'];

const numBathsTypes = [0, 1, 1.5, 2, 2.5];

let count = 0;

const allRecords = [];
const seedDB = async (records, dbname) => {
let batchCount = 0;
let batch = [];

while (records !== 0) {
 var thisStayObj = {};

 thisStayObj.numBedrooms = 1 + randomIntLessThan(5);
 thisStayObj.numBeds = 1 + thisStayObj.numBedrooms * randomIntLessThan(3);
 thisStayObj.numBaths = numBathsTypes[randomIntLessThan(numBathsTypes.length)];
 thisStayObj.numGuests = thisStayObj.numBeds * (randomIntLessThan(2) + 1);
 thisStayObj.typeOfStay = stayTypes[randomIntLessThan(stayTypes.length)];
 thisStayObj.hostName = hostNames[randomIntLessThan(numOfHostNames)];
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
  const couchDB = await createCouchdb();
  for (let i = 0; i < 10; i++) {
    await seedDB(1000000, couchDB);
  }
}


if (process.env.DATABASE === 'couchdb') {
  seedDATABASE();
};



