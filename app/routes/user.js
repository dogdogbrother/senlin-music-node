/**
 * user 模块下东西有点多的了
 * 
 */
const jwt = require('koa-jwt')
const Router = require('koa-router')
const { login, register, userInfo } = require('../controllers/users');
const { secret } = require('../config')

const router = new Router()

const auth = jwt({ secret })

router.post('/login',login)
router.post('/register',register)
router.get('/user/info', auth, userInfo)


module.exports = router