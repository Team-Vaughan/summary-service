var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var path = require('path');
var db = require('../database/db.js');
var {SERVER_PORT} = require('../config.js');
const couchdb = require('../database/couchDB.js');


var app = express();
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json());


app.use(cors());
app.use('/rooms/:id', express.static(__dirname + '/../client/dist'));


app.get('/', async(req, res) => {
  couchdb.insertIntoCouchDB(8);
})

app.get('/rooms/:id/summary', async (req, res) => {
  db.getSummaryInfo(req.params.id, (err, info) => {
    if(err) {
      res.sendStatus(404);
    } else {
      res.send(info);
    }
  })
})

app.post('/rooms/summary', async (req, res) => {

  // get body from post request
  //need to check that all info was correctly sent or sent at all
  req.body.numBeds === undefined ? req.body.numBeds = "": req.body.numBeds;

  req.body.numBedrooms === undefined ? req.body.numBedrooms = "":req.body.numBedrooms;

  req.body.numBaths === undefined ? req.body.numBaths = "" :req.body.numBaths;

  req.body.numGuests === undefined ? req.body.numGuests = "" : req.body.numGuests;

  req.body.typeOfStay === undefined ? req.body.typeOfStay = "" : req.body.typeOfStay;

  db.insertNewSummary(req.body, (err, result) => {
    if (err) {
      console.log(err);
      res.sendStatus(404);
    } else {
      res.sendStatus(result)
    }
  })
})

app.delete('/rooms/summary/:stayId', async (req, res) => {
  let stayId = req.params.stayId;
  db.deleteSummary(stayId, (err, result) => {
    if (err) {
      console.log(err);
      res.sendStatus(404);
    } else {
      console.log('Record successfully removed');
      res.sendStatus(result);
    }
  })
})

app.put('/rooms/summary/:stayId', async (req, res) => {
  let stayId = req.params.stayId;
  db.updateSummary(stayId, (err, result) => {
    if (err) {
      console.log(err);
      res.sendStatus(404);
    } else {
      console.log('Record successfully updated');
      res.sendStatus(result);
    }
  })
})


console.log('listening on port ', SERVER_PORT);
app.listen(SERVER_PORT);

module.exports = app;