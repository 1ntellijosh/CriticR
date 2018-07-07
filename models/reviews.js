const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const revSchema = new Schema({
  type: String,
  author: String,
  title: String,
  genre: String,

  score: [Number],
  comments: [{username:String, comment: String}]
}, {timestamps: true});

const Reviews = mongoose.model('Reviews', revSchema);

module.exports = Reviews;
