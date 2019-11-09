const Music = require('../models/music');
const shell = require('shelljs');

class MusicCtl {

  async updatesong(ctx) {
    ctx.body = {
      code: 100,
      data: ctx.req.files.file.path,
      msg: '歌曲上传成功,等待其他信息'
    }
  }

  async updatecover(ctx) {
    ctx.body = {
      code: 100,
      data: ctx.req.files.avatar.path,
      msg: '图片上传成功,等待其他信息'
    }
  }

  async updatemusic(ctx) {
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
      author: ctx.request.body.author
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
    ctx.body = musicInfo;
  }
}

module.exports = new MusicCtl()