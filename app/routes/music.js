/**
 * music 目录下写一些关于歌曲的一些接口
 * 例如查询歌曲，上传歌曲等等
 */
const jwt = require('koa-jwt')
const Router = require('koa-router')
const { secret } = require('../config')
const multiparty = require('koa2-multiparty');

const { updatesong, updatecover, updatemusic, searchsong } = require('../controllers/music');

const router = new Router()

const auth = jwt({ secret })

router.get('/music/searchsong', searchsong)

router.post('/music/updatesong', auth, multiparty(), updatesong)

router.post('/music/updatecover', auth, multiparty(), updatecover)

router.post('/music/updatemusic', auth, multiparty(), updatemusic)

module.exports = router