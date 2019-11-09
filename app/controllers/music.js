const Music = require('../models/music');
const shell = require('shelljs');

class MusicCtl {
  async updatesong(ctx) {
    console.log(ctx.req.files.file);
    
    ctx.body = {
      code: 100,
      data: ctx.req.files.file.path
    }
  }

  async updatemusic(ctx) {
    const shellCode = await shell.exec(`mv ${ctx.request.body.songPath} /data/music/song`);
    if (!shellCode) {
      ctx.body = {
        code: 500,
        msg: '保存文件失败,从重新尝试上传'
      }
      return;
    }
    const songName = ctx.request.body.songPath.split('/tmp/')[1];
    ctx.body = '测试是否成功'
    // ctx.request.body
  }
}

module.exports = new MusicCtl()