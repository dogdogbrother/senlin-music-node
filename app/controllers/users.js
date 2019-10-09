const jsonwebtoken = require('jsonwebtoken')
const User = require('../models/users');
const { secret } = require('../config');

class UsersCtl {
    async login(ctx) {
        ctx.verifyParams({
            name: { type: 'string', required: true },
            password: { type: 'string', required: true }
        })
        const user = await User.findOne(ctx.request.body)
        if (!user) { ctx.throw(401, '用户名或密码不正确') }
        const { _id } = user
        const token = jsonwebtoken.sign({ _id }, secret, { expiresIn: '1d' })
        ctx.cookies.set('token', token, {
            overwrite: true,
            maxAge:1000000,
            httpOnly: false
        })

        ctx.body = user 
    }
    async register(ctx) {
        ctx.verifyParams({
            name: { type: 'string', required: true },
            password: { type: 'string', required: true },
            affirmPassword: { type: 'string', required: true }
        });
        if (ctx.request.body.password !== ctx.request.body.affirmPassword) ctx.throw(401, '两次密码输入不一致,请确认')
        const { name } = ctx.request.body;
        const repeatedUser = await User.findOne({ name })
        if (repeatedUser) { ctx.throw(409, '用户已经存在,请更换用户名') }
        delete ctx.request.body.affirmPassword
        const user = await new User(ctx.request.body).save();
        ctx.body = user;
    }
    async userInfo(ctx) {
        let info = await User.findById( { _id:ctx.state.user._id })
        console.log(info);
        
        ctx.body = await User.findById( { _id:ctx.state.user._id })
    }
}

module.exports = new UsersCtl()