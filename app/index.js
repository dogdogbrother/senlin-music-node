const Koa = require('koa')
const mongoose = require('mongoose')
const parameter = require('koa-parameter');
const bodyparser = require('koa-bodyparser');
const statics = require('koa-static')


const app = new Koa()
const routing = require('./routes')
const { connectionStr } = require('./config')

const staticPath = '../../../../data/music'

mongoose.connect(connectionStr, { useUnifiedTopology: true,  useNewUrlParser: true }, () => {
    console.log('链接成功');
})

// mongoose.connection.on('error',console.error)

app.use(statics(
    path.join(__dirname, staticPath)
  ))
app.use(bodyparser());
app.use(parameter(app));
routing(app)

app.listen(3004, () => {console.log('3004端口已经开启')})