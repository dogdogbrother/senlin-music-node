/**
 * music 目录下写一些关于歌曲的一些接口
 * 例如查询歌曲，上传歌曲等等
 */
const jwt = require('koa-jwt')
const Router = require('koa-router')
const { list  } = require('../controllers/users');
const { secret } = require('../config')

const router = new Router()

const auth = jwt({ secret })



const songList = require('../../song-list')



router.get('/music/songlist',(ctx) => {
    ctx.body = songList
})

module.exports = router