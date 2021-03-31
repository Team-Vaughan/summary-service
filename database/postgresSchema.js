const { Sequelize, DataTypes } = require('sequelize');
const { db } = require('./postgresDB.js')



//summary table schema
const summaries = db.define('summaries', {
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER
  },
  numBeds: {
    type: DataTypes.INTEGER
  },
  typeOfStay: {
    type: DataTypes.STRING,
    primaryKey: true,
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
  hostId: {
    type: DataTypes.INTEGER,
    references: {
      model: hostInfo,
      key: 'id'
    }
  }
});

//host info table
const hostInfo = db.define('hostInfo', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    DataTypes.INTEGER
  },
  hostName: {
    type: DataTypes.STRING
  }
})


hostInfo.hasMany(summaries);
summaries.belongsTo(hostInfo);




module.exports = {
  summaries,
  hostInfo
};