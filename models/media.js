const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mediaSchema = new Schema({
  type: String,
  title: String,
  pub: String,
  genre: String,
  images: [String],
  score: Number,
  reviews: [{

        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reviews'

}]
}, {timestamps: true});

const Media = mongoose.model('Media', mediaSchema);

module.exports = Media;
