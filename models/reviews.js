const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const revSchema = new Schema({
  author: String,//id of the user
  media: String,///id of the movie/game
  type: String,
  title: String,
  rtitle: String,
  article: String,
  score: [Number],
  comments: [{username:String, comment: String}]
}, {timestamps: true});

const Reviews = mongoose.model('Reviews', revSchema);

module.exports = Reviews;
