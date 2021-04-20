const {StaySummaryTest} = require('./mockDatabase.js');
const { summaries, hosts } = require('./postgresSchema.js');
// const { db } = require('./postgresDB.js');
const faker = require('faker');

let numberOfRecords = 100000;

var randomIntLessThan = (input) => {
  return Math.floor(Math.random() * input);
}

var randomIntLessThanButNotZero = (input) => {
  let randomNum = Math.floor(Math.random() * input);
  let result = (randomNum === 0) ? 1 : randomNum;
  return result;
}

var createName = () => {
let firstName = faker.name.findName();
let middleInital = faker.name.findName();
let lastName = faker.name.findName();
firstName = firstName.split(' ');
firstName = firstName[0];
middleInital = middleInital[0];
lastName = lastName.split(' ');
lastName = lastName[0];
let name = firstName + ' ' + middleInital + ' ' + lastName;
return name;
}

var getHostNames = async (numOfRecords) => {
  let hostNames = [];
  let numOfHosts = Math.floor(numOfRecords / 1.75)
  for (let i = 0; i < numOfHosts; i++) {
    let name = createName();
    hostNames.push(name);
  }
  return hostNames;
}

 const stayTypes = ['Entire home', 'Private room', 'Treehouse', 'Entire bungalow', 'Entire camper', 'Studio apartment', 'Entire cabin', 'Private loft', 'Empty lot', 'Entire guest suite', 'Entire guesthouse', 'Entire condominium', 'Tiny house', 'Spy mansion', 'Haunted house', 'Bomb shelter', 'Bunkbed fort', 'Entire spacious trunk of car', 'Medieval castle', 'Entire Spice Bus', 'Airplane'];

const numBathsTypes = [0, 1, 1.5, 2, 2.5];

let count = 1;

const seedPostgresDB = async (records) => {

  let allHosts = await getHostNames(records);
  let numOfRecords = records;
  // await db.sync({
  //     force: true
  //   })

const allSummaryRecords = [];
const allHostRecords = [];
let batchCount = 0;
let summaryBatch = [];
let hostBatch = [];


let hostBatchCount = 0;
for (let m = 0; m < allHosts.length; m++) {
  let thisHostInfoObj = {};
  thisHostInfoObj.hostName = allHosts[m];
  hostBatch.push(thisHostInfoObj);
  hostBatchCount++;
  if (hostBatchCount === 1000) {
    allHostRecords.push(hostBatch);
    hostBatch = [];
    hostBatchCount = 0;
  }
}

while (records !== 0) {
 let thisStayObj = {};
 thisStayObj.numBedrooms = 1 + randomIntLessThan(5);
 thisStayObj.numBeds = 1 + thisStayObj.numBedrooms * randomIntLessThan(3);
 thisStayObj.numBaths = numBathsTypes[randomIntLessThan(numBathsTypes.length)];
 thisStayObj.numGuests = thisStayObj.numBeds * (randomIntLessThan(2) + 1);
 thisStayObj.typeOfStay = stayTypes[randomIntLessThan(stayTypes.length)];
 //hostId will be random 1 - 150 or how many host there are
 thisStayObj.hostId= randomIntLessThanButNotZero(allHosts.length);
 thisStayObj.stayId = count;
 count++;
  summaryBatch.push(thisStayObj);
  batchCount++;
  if (batchCount === 1000) {
    allSummaryRecords.push(summaryBatch);
    summaryBatch = [];
    batchCount = 0;
  }
  records--;
};


if (summaryBatch.length > 0) {
  allSummaryRecords.push(summaryBatch);
}
if (hostBatch.length > 0) {
  allHostRecords.push(hostBatch);
}


for (let i = 0; i < allHostRecords.length; i++) {
  try {
    await insertRecords(hosts, allHostRecords[i]);
  } catch(err) {
    console.log('Error seeding postgres database with hosts', err);
  }
}

for (let i = 0; i < allSummaryRecords.length; i++) {
      try {
        await insertRecords(summaries, allSummaryRecords[i]);
      } catch (e) {
        console.log('Error seeding postgres database with summaries', e);
      }
  }
  console.log(`DONE SEEDING: ${numOfRecords} records`)
};

const insertRecords = async (model, records) => {
  await model.bulkCreate(records);
}



seedPostgresDB(numberOfRecords);
seedPostgresDB(numberOfRecords);
seedPostgresDB(numberOfRecords);








