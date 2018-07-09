const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mediaSchema = new Schema({
  type: String,
  title: String,
  pub: String,
  genre: String,
  images: [String],
  score: Number,
  reviews: [String]
}, {timestamps: true});

const Media = mongoose.model('Media', mediaSchema);

module.exports = Media;
