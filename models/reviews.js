const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const revSchema = new Schema({
  author: String,//id of the user who made review
  username: String,
  media: String,///id of the movie/game (media model)
  type: String,
  title: String,
  poster: String,
  rtitle: String,
  article: String,
  score: [Number],
  comments: [{username:String, comment: String}]
}, {timestamps: true});

const Reviews = mongoose.model('Reviews', revSchema);

module.exports = Reviews;
