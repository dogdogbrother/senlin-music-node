const Koa = require('koa')
const mongoose = require('mongoose')

const app = new Koa()
const routing = require('./routes')
const { connectionStr } = require('./config')

mongoose.connect(connectionStr,{ useUnifiedTopology: true,  useNewUrlParser: true },() => {
    console.log('链接成功');
    
})
// mongoose.connection.on('error',console.error)


routing(app)



app.listen(3000, () => {console.log('3000端口已经开启')})