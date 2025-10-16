const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  dob: Date,
  profilePicture: String,
});

module.exports = mongoose.model('User', userSchema);
