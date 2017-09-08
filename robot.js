const mongoose = require('mongoose');

const robotSchema = new mongoose.Schema({
  // id: {type: String, required: false, unique: true},
  username: {type: String, required: true, unique: true},
  name: {type: String, required: true, unique: true},
  avatar: {type: String, required: false, unique: false},
  email: {type: String, required: true, unique: true},
  university: String,
  job: String,
  company: String,
  skills: [String],
  phone:
})

const Robot = mongoose.model('Robot', robotSchema);

module.exports = Robot;
