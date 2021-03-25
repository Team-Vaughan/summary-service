const { Sequelize, DataTypes } = require('sequelize');
const { db } = require('./postgresDB.js')



//single table schema
const summaries = db.define('summaries', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  numBeds: {
    type: DataTypes.INTEGER
  },
  typeOfStay: {
    type: DataTypes.STRING
  },
  stayId: {
    type: DataTypes.INTEGER
  },
  numBedrooms: {
    type: DataTypes.INTEGER
  },
  numBaths: {
    type: DataTypes.INTEGER
  },
  numGuests: {
    type: DataTypes.INTEGER
  },
  hostName: {
    type: DataTypes.STRING
  }
});




module.exports.summaries = summaries;