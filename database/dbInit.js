const {NUMBER_OF_STAYS, StaySummary} = require('./dbStart.js');

const PARTY_MODE = true;

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

      var thisStay = new StaySummary(thisStayObj);

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


