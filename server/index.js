require('newrelic');
const redis = require('redis');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const {SERVER_PORT} = require('../config.js');
const controllers = require('./controllers.js');
const { getRoomSummary} = require('../database/crudOperations.js');


const redisPort = 6379;

const client = redis.createClient(redisPort);

client.on("connect", () => {
  console.log('redis is connected');
})
client.on("error", (err) => {
  console.log(err);
});

var app = express();

app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json());


app.use(cors());

// app.use('/:id', express.static(__dirname + '/../public'));



app.use('/rooms/:id', express.static(__dirname + '/../client/dist'));

app.use(express.static(__dirname + '/../public'));


app.post('/rooms/addRoomSummary', controllers.addSummaryInfoToRoom);

app.get('/rooms/:id/summary', async (req, res) => {
  let stayId = req.params.id;
    // client.set(1009, 1009, (res, err) => {
    //   if (err) {
    //     throw(err)
    //   } else {
    //     console.log(res);
    //   }
    // })
  console.log('called', stayId);
    client.get(stayId, (err, data) => {
      if (err)
      console.log('here with error', data);
      if(data) {
        console.log('here', data);
        res.status(200).send(data);
      } else {
        console.log('made it here');
        getRoomSummary(stayId, (summary, err) => {
          if(summary === null) {
            res.sendStatus(err);
          } else {
            client.set(stayId, JSON.stringify(summary), redis.print);
            res.status(200).send(summary);
          }
        });
        //  controllers.getRoomSummaryInfo(req, res);

      }
    });
});
// app.get('/rooms/:id/summary', controllers.getRoomSummaryInfo);

app.put('/rooms/summary/:stayId', controllers.updateRoomSummary);

app.delete('/rooms/summary/:stayId', controllers.deleteRoomInfo);


console.log('listening on port ', SERVER_PORT);
app.listen(SERVER_PORT);

module.exports = app;