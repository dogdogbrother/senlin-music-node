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
            maxAge:1000000000,
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
        ctx.body = await User.findById( { _id:ctx.state.user._id })
    }
    async likeSong(ctx) {
        //首先呢，我们要通过token的id找到这个文档，然后push进数据，再更新
        let userInfo = await User.findById( { _id:ctx.state.user._id })

        userInfo.fonds.push(ctx.request.body)

        await User.findByIdAndUpdate(ctx.state.user._id, userInfo,{ new: true }) 
          
        ctx.body = ctx.request.body
    }
    async dislikeSong(ctx) {
        //首先呢，我们要通过token的id找到这个文档，然后通过ctx.request.body.id过滤歌曲，删除后更新，然后把剩下的歌单全部返回去
        let userInfo = await User.findById( { _id:ctx.state.user._id })

        userInfo.fonds = userInfo.fonds.filter(item=>item.id !== ctx.request.body.id)

        await User.findByIdAndUpdate(ctx.state.user._id, userInfo,{ new: true })
        
        ctx.body = userInfo.fonds
    }
    async updateSong(ctx) {
        
        console.log('------------------------------------------------------------------------------')
        ctx.body = '上传成功，服务器收到了'
        
    }
}

module.exports = new UsersCtl()