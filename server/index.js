require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
// const db = require('../database/db.js');
const {SERVER_PORT} = require('../config.js');
// const couch = require('../database/couch.js');
const controllers = require('./controllers.js');


var app = express();

app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json());


app.use(cors());

// app.use('/:id', express.static(__dirname + '/../public'));



// app.use('/rooms/:id', express.static(__dirname + '/../client/dist'));

app.use(express.static(__dirname + '/../public'));


app.post('/rooms/addRoomSummary', controllers.addSummaryInfoToRoom);

app.get('/rooms/:id/summary', controllers.getRoomSummaryInfo);

app.put('/rooms/summary/:stayId', controllers.updateRoomSummary);

app.delete('/rooms/summary/:stayId', controllers.deleteRoomInfo);


console.log('listening on port ', SERVER_PORT);
app.listen(SERVER_PORT);

module.exports = app;