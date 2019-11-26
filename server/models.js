const mongoose = require('mongoose');

const { Schema } = mongoose;

const AccountSchema = new Schema({
  id: Schema.ObjectId,
  username: String,
  password: String,
  gifs: [{
    type: Schema.ObjectId,
    ref: 'Gif',
  }],
});

const GifSchema = new Schema({
  id: Schema.ObjectId,
  giphyId: String,
  images: {
    fixedWidth: {
      height: Number,
      webp: String,
      width: Number,
    },
    original: {
      height: Number,
      webp: String,
      width: Number,
    },
  },
  title: String,
});

module.exports = {
  Account: mongoose.model('Account', AccountSchema),
  Gif: mongoose.model('Gif', GifSchema),
};
