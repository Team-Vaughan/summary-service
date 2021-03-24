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
  }
});


let obj1 = {
  numBeds: 2,
  typeOfStay: 'cat garage',
  stayId: 44
}

let docs = [];
docs.push(obj1);

//able to insert records into sumamries database
db.sync({
  force: true
})
.then(() => {
  console.log(docs);
  summaries.bulkCreate(docs)
})


module.exports.summaries = summaries;