const mongoose = require('mongoose');

const { Schema } = mongoose;

const AccountSchema = new Schema({
  id: Schema.ObjectId,
  username: String,
  password: String,
});

module.exports = {
  Account: mongoose.model('Account', AccountSchema),
};
