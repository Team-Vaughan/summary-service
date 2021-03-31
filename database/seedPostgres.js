const {StaySummaryTest} = require('./mockDatabase.js');
const { summaries, hostInfo } = require('./postgresSchema.js');
const { db } = require('./postgresDB.js');
const faker = require('faker');

var randomIntLessThan = (input) => {
  return Math.floor(Math.random() * input);
}

//generate host names
const hostNames = [];
let numOfHostNames = 5;
const generateHostNames = (numOfHost) => {
  for (let i = 0; i < numOfHost; i++) {
    let randomName = faker.name.findName();
    hostNames.push(randomName);
  }
}
generateHostNames(numOfHostNames);

 const stayTypes = ['Entire home', 'Private room', 'Treehouse', 'Entire bungalow', 'Entire camper', 'Studio apartment', 'Entire cabin', 'Private loft', 'Empty lot', 'Entire guest suite', 'Entire guesthouse', 'Entire condominium', 'Tiny house', 'Spy mansion', 'Haunted house', 'Bomb shelter', 'Bunkbed fort', 'Entire spacious trunk of car', 'Medieval castle', 'Entire Spice Bus', 'Airplane'];

const numBathsTypes = [0, 1, 1.5, 2, 2.5];

let count = 0;

const seedPostgresDB = async (records) => {
  let numOfRecords = records;
  await db.sync({
      force: true
    })

const allSummaryRecords = [];
const allHostRecords = [];
let batchCount = 0;
let summaryBatch = [];
let hostBatch = [];


while (records !== 0) {
 let thisStayObj = {};

 let thisHostInfoObj = {};

thisHostInfoObj.hostName = randomIntLessThan[numOfHostNames];

 thisStayObj.numBedrooms = 1 + randomIntLessThan(5);
 thisStayObj.numBeds = 1 + thisStayObj.numBedrooms * randomIntLessThan(3);
 thisStayObj.numBaths = numBathsTypes[randomIntLessThan(numBathsTypes.length)];
 thisStayObj.numGuests = thisStayObj.numBeds * (randomIntLessThan(2) + 1);
 thisStayObj.typeOfStay = stayTypes[randomIntLessThan(stayTypes.length)];
 //hostId will be random 1 - 150 or how many host there are
 thisStayObj.hostId= randomIntLessThan(numOfHostNames);
 thisStayObj.stayId = count + 100;
 count++;
  summaryBatch.push(thisStayObj);
  hostBatch.push(thisHostInfoObj);
  batchCount++;
  if (batchCount === 1000) {
    allSummaryRecords.push(summaryBatch);
    allHostRecords.push(hostBatch);
    summaryBatch = [];
    hostBatch = [];
    batchCount = 0;
  }
  records--;
};

if (batch.length > 0) {
  allSumamryRecords.push(summaryBatch);
  allHostRecords.push(hostBatch);
}

for (let i = 0; i < allSummaryRecords.length; i++) {
      try {
        await insertRecords(allSummaryRecords[i]);
      } catch (e) {
        console.log('Error seeding postgres database', err);
      }
  }
  console.log(`DONE SEEDING: ${numOfRecords} records`)
};

const insertRecords = async (records) => {
  await summaries.bulkCreate(records);
}


seedPostgresDB(1000);




