const Koa = require('koa')
const mongoose = require('mongoose')
const parameter = require('koa-parameter');
const bodyparser = require('koa-bodyparser');


const app = new Koa()
const routing = require('./routes')
const { connectionStr } = require('./config')

mongoose.connect(connectionStr,{ useUnifiedTopology: true,  useNewUrlParser: true },() => {
    console.log('链接成功');
    
})
// mongoose.connection.on('error',console.error)


app.use(bodyparser());
app.use(parameter(app));
routing(app)



app.listen(3030, () => {console.log('3030端口已经开启')})