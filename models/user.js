const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  location: String,
  report: String,
  date: String,
  time: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;