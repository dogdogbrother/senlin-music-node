const Music = require('../models/musics');
const shell = require('shelljs');

class MusicCtl {

  async searchsong(ctx) {
    const reg = new RegExp(ctx.query.keywords, 'i') 
    const nameRes = await Music.find({songName: reg})
    const authorRes = await Music.find({author: reg})
    console.log(nameRes)
    console.log(authorRes)
    ctx.body= [...nameRes,...authorRes]
  }

  async updatesong(ctx) { // 只是歌曲上传,没有数据库操作
    console.log(ctx.req.files.file);
    ctx.body = {
      code: 100,
      data: {
        path: ctx.req.files.file.path,
        name: ctx.req.files.file.name
      },
      msg: '歌曲上传成功,等待其他信息'
    }
  }

  async updatecover(ctx) {  // 只是封面上传,没有数据库操作
    ctx.body = {
      code: 100,
      data: ctx.req.files.avatar.path,
      msg: '图片上传成功,等待其他信息'
    }
  }

  async updatemusic(ctx) {  // 真正的操作歌曲和封面
    const shellCode = await shell.exec(`mv ${ctx.request.body.songPath} /data/music/song/`);
    if (!shellCode) {
      ctx.body = {
        code: 500,
        msg: '保存音乐文件失败,从重新尝试上传'
      }
      return;
    }
    const songName = ctx.request.body.songPath.split('/tmp/')[1];
    const musicInfo = {
      songUrl: `http://49.233.185.168:3004/song/${songName}`,
      coverUrl: '',
      songName: ctx.request.body.songName,
      author: ctx.request.body.author,
      updateUserId: ctx.state.user._id
    }
    if (ctx.request.body.coverPath) {
      const shellCode2 = await shell.exec(`mv ${ctx.request.body.coverPath} /data/music/img/`);
      if (!shellCode2) {
        ctx.body = {
          code: 500,
          msg: '保存图片文件失败,从重新尝试上传'
        }
        return;
      }
      const coverName = ctx.request.body.coverPath.split('/tmp/')[1];
      musicInfo.coverUrl = `http://49.233.185.168:3004/img/${coverName}`;
    }
    await new Music(musicInfo).save();
    ctx.body = {
      code: 100,
      msg: '上传成功',
      ...ctx.request.body
    };
  }
}

module.exports = new MusicCtl()