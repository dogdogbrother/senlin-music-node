/**
 * index 文件只是为了整合其他的模块
 */

const fs = require('fs')
module.exports = (app) => {
    fs.readdirSync(__dirname).forEach(file => {
        if (file === 'index.js') return
        const route = require(`./${file}`)
        app.use(route.routes())
    })
}