const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mediaSchema = new Schema({
  type: String,
  title: String,
  pub: String,
  genre: String,
  poster: String,
  images: [String],
  score: Number,
  reviews: [{
        // Review entities are related to media model so they can be populated together. 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reviews'

}]
}, {timestamps: true});

const Media = mongoose.model('Media', mediaSchema);

module.exports = Media;
