var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var path = require('path');
var db = require('../database/db.js');
var {SERVER_PORT} = require('../config.js');


var app = express();
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json());

app.use(cors());
app.use('/rooms/:id', express.static(__dirname + '/../client/dist'));

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
  console.log(req.body);
  // get body from post request
  db.insertNewSummary(req.body, (err, info) => {
    if (err) {
      res.sendStatus(404);
    } else {
      res.sendStatus(200);
    }
  })
})


console.log('listening on port ', SERVER_PORT);
app.listen(SERVER_PORT);

module.exports = app;