const {DATABASE_NAME, DATABASE_PORT} = require('../config.js');

var port = DATABASE_PORT === '' ? '' : ('/' + DATABASE_PORT);
console.log(`mongodb://localhost${port}/${DATABASE_NAME}`);
const mongoose = require('mongoose');
mongoose.connect(`mongodb://localhost${port}/${DATABASE_NAME}`);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'airBnB summary database connection error'));
db.once('open', () => {
  console.log('database is open');
})

const NUMBER_OF_STAYS = 100;


const staySummarySchema = new mongoose.Schema({
  numBeds: Number,
  numBedrooms: Number,
  numBaths: Number,
  numGuests: Number,
  typeOfStay: String,
  stayId: Number
});
const StaySummary = mongoose.model('StaySummary', staySummarySchema);

module.exports = {
  staySummarySchema,
  NUMBER_OF_STAYS,
  StaySummary
}