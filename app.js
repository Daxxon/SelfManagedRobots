const bcrypt = require('bcryptjs');
const data = require('./data.js');
const earl = 'mongodb://localhost/robots';
const express = require('express');
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const mustacheExpress = require('mustache-express');
const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const path = require('path');
const routeController = require('./routes.js');
mongoose.Promise = require('bluebird');

// const Planet = require('./models/planet/Planets.js');

app.use(express.static('public'));
app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

app.use(session({
  secret: 'party parrot',
  resave: false,
  saveUninitialized: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

MongoClient.connect(earl)
.then((db) => {
  db.collection('robots').deleteMany({});
  db.close();
})

MongoClient.connect(earl)
.then((db) => {
  let collection = db.collection('robots');
  collection.insertMany(data.users)
.then(() => {
  db.close();
})});

app.get('/', (req, res) => {
  MongoClient.connect(earl)
    .then((db) => {
      let collection = db.collection('robots');
      collection.find().toArray()
    .then((users) => {
      console.log('RENDERING INDEX');
      // console.log(users);
      res.render('index', {users});
      db.close();
    })})
});

app.get('/user/:id', (req, res) => {
  let myId = parseInt(req.params.id);
  // console.log('USER ID: ' + myId);
  // console.log(typeof(myId));
  MongoClient.connect(earl)
    .then((db) => {
      let collection = db.collection('robots');
      collection.findOne({'id' : myId})
    .then((myUser) => {
      console.log("RENDERING USER " + myId);
      console.log(myUser);
      res.render('user', myUser);
      db.close();
    })})
});

app.use(routeController);

app.listen(3000, () => console.log('SHOW ME WHAT YOU GOT'));
