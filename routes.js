const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(expressValidator());



module.exports = router;
