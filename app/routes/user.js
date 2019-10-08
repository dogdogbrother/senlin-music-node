/**
 * user 模块下东西有点多的了
 * 
 */
// const jwt = require('koa-jwt')
const jsonwebtoken = require('jsonwebtoken');
const Router = require('koa-router')
const { login, register, userInfo } = require('../controllers/users');
const { secret } = require('../config')

const router = new Router()

// const auth = jwt({ secret })
const auth = async (ctx, next) => {
    let token = ctx.request.header.cookie
    if (!token) {
        ctx.throw(401, '没有token，未登录')
    }else{
        token = token.split('; token=')[1]
        ctx.state.token = token
        next()
    }
}



router.post('/login',login)
router.post('/register',register)
router.get('/user/info', auth, userInfo)


module.exports = router