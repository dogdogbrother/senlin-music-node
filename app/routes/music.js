/**
 * music 目录下写一些关于歌曲的一些接口
 * 例如查询歌曲，上传歌曲等等
 */
const Router = require('koa-router')
const router = new Router()

router.post('/login',(ctx) => {
    ctx.body = '测试'
})

module.exports = router