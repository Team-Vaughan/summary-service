const { Sequelize, DataTypes } = require('sequelize');
const { db } = require('./postgresDB.js')

//host info table
const hosts = db.define('hosts', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  hostName: {
    type: DataTypes.STRING
  }
})

//summary table schema
const summaries = db.define('summaries', {
  id: {
    allowNull: false,
    autoIncrement: true,
    type: DataTypes.INTEGER
  },
  numBeds: {
    type: DataTypes.INTEGER
  },
  typeOfStay: {
    type: DataTypes.STRING,
  },
  stayId: {
    allowNull: false,
    primaryKey: true,
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
    type: DataTypes.INTEGER
  }

});


 hosts.hasMany(summaries, {foreignKey: 'hostId'})
 summaries.belongsTo(hosts, {foreignKey: 'hostId'})


module.exports = {
  summaries,
  hosts
};