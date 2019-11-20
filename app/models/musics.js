const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const musicSchema = new Schema({
  __v: { type: Number, select: false }, //不知道啥玩意
  songUrl: { type: String, required: true },  //歌曲url
  coverUrl: { type: String, required: false, select: true }, //封面的url
  updateUserId: { type: String, required: true, select: true }, //上传者的ID
  songName: { type: String, required: true },   //歌曲名字
  author: { type: String, required: true, select: true },//歌曲作者
  describe: { type: String, required: false, select: true }, // 描述
});

module.exports = model('Music', musicSchema);