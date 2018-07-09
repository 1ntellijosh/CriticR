const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const revSchema = new Schema({
  type: String,
  author: String,
  username: String,
  title: String,
  rtitle: String,
  pub: String,
  genre: String,
  article: String,
  images: [String],
  score: [Number],
  comments: [{username:String, comment: String}]
}, {timestamps: true});

const Reviews = mongoose.model('Reviews', revSchema);

module.exports = Reviews;
