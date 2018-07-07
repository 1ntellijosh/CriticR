const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {type: String, unique: true},
  password: String,
  img: String,
  reviews: [String],
  comments: [String]
});

const Users = mongoose.model('Users', userSchema);

module.exports = Users;
