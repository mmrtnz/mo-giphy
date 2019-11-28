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
  giphyIds: [String],
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

const TagSchema = new Schema({
  id: Schema.ObjectId,
  description: String,
});

const AccountGifTagSchema = new Schema({
  id: Schema.ObjectId,
  accountId: Schema.ObjectId,
  gifId: Schema.ObjectId,
  tagIds: [{
    type: Schema.ObjectId,
    ref: 'Tag',
  }],
});

module.exports = {
  Account: mongoose.model('Account', AccountSchema),
  AccountGifTag: mongoose.model('AccountGifTag', AccountGifTagSchema),
  Gif: mongoose.model('Gif', GifSchema),
  Tag: mongoose.model('Tag', TagSchema),
};
