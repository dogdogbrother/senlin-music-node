const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const userSchema = new Schema({
  __v: { type: Number, select: false },
  name: { type: String, required: true },
  password: { type: String, required: true, select: false },
  avatar_url: { type: String, default: '' },
  accountName: { type: String, default: '' },
  gender: { type: String, enum: ['male', 'female'], default: 'male' },
  fonds:[]
});

module.exports = model('User', userSchema);