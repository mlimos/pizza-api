const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
let db = require('./config/db');

const app = express();

const port = 8000;

//app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

MongoClient.connect(db.url, (err, database) => {
  if (err) return console.log(err)
  db = database.db('pizza_dev');
  require('./app/routes/pizza_routes.js')(app, db);
  app.listen(port, () => {
    console.log('We are live on ' + port);
  });
})
