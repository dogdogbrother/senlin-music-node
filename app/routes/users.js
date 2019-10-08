/**
 * login 模块下面只写不多的一些内容
 * 登录，注册，修改密码
 */
const Router = require('koa-router')
const router = new Router()
const { login } = require('../controllers/users')



router.post('/login',login)




module.exports = router