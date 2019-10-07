/**
 * user 模块下东西有点多的了
 * 
 */
const Router = require('koa-router')
const router = new Router()

router.post('/login',(ctx) => {
    ctx.body = '测试'
})

module.exports = router