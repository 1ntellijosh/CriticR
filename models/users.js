const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  img: String,
  reviews: [String],
  comments: [String]
});

const Users = mongoose.model('Users', userSchema);

module.exports = Users;
