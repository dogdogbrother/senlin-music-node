/**
 * user 模块下东西有点多的了
 * 
 */
const Router = require('koa-router')
const { login, register } = require('../controllers/users');


const router = new Router()



router.post('/login',login)
router.post('/register',register)

module.exports = router