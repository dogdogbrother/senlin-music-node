const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const musicSchema = new Schema({
  songUrl: { type: String, required: true },
  coverUrl: { type: String, required: true, select: false },
});

module.exports = model('Music', musicSchema);