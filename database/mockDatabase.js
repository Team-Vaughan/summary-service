const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/airBnB-summariesTest', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.createConnection('mongodb://localhost/airBnB-summariesTest', {useNewUrlParser: true, useUnifiedTopology: true});
db.on('error', console.error.bind(console, 'connection error'));

const staySummaryTestSchema = new mongoose.Schema({
  numBeds: Number,
  numBedrooms: Number,
  numBaths: Number,
  numGuests: Number,
  typeOfStay: String,
  stayId: Number
});
const StaySummaryTest = mongoose.model('StaySummaryTest', staySummaryTestSchema);



module.exports = {StaySummaryTest};