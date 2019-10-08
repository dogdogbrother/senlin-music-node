const jsonwebtoken = require('jsonwebtoken')
const User = require('../models/users');
const { secret } = require('../config');

class UsersCtl {
    async login(ctx) {
        ctx.verifyParams({
            username: { type: 'string', required: true },
            password: { type: 'string', required: true }
        })
        const user = await User.findOne(ctx.request.body)
        if (!user) { ctx.throw(401, '用户名或密码不正确') }
        const { _id, name } = user
        const token = jsonwebtoken.sign({ _id, name }, secret, { expiresIn: '1d' })
        console.log(token);  
        console.log('--------------------------');
        

        ctx.cookies.set('token', token, {
            overwrite: true,
            maxAge:1000000
        })

        ctx.body = { user }
    }
    async register(ctx) {
        ctx.verifyParams({
            username: { type: 'string', required: true },
            password: { type: 'string', required: true },
            affirmPassword: { type: 'string', required: true }
        });
        if (ctx.request.body.password !== ctx.request.body.affirmPassword) ctx.throw(401, '两次密码输入不一致,请确认')
        const { username } = ctx.request.body;
        const repeatedUser = await User.findOne({ username })
        if (repeatedUser) { ctx.throw(409, '用户已经存在,请更换用户名') }
        delete ctx.request.body.affirmPassword
        const user = await new User(ctx.request.body).save();
        ctx.body = user;
    }
    async userInfo(ctx) {
        const { _id } = jsonwebtoken.verify(ctx.state.token, secret)
        console.log(_id);
    
        const test = await User.findOne({ _id });
        console.log(typeof test);
        
        ctx.body = 'test'
    }
}

module.exports = new UsersCtl()