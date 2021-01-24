var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var path = require('path');
var db = require('../database/db.js');

var PORT = 5002;
var app = express();

app.use('/:id/summary', express.static(__dirname + '/../client/dist'));

app.get('/:id/summary/info', async (req, res) => {
  db.getSummaryInfo(req.params.id, (err, info) => {
    if(err) {
      res.sendStatus(404);
    } else {
      res.send({ info });
    }
  })
})


console.log('listening on port ', PORT);
app.listen(PORT);

module.exports = app;