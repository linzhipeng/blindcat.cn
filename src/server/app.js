var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var config = require('./config/config.js')

// 引入mongoose模块配置并连接数据库
// var mongoose = require('./config/mongoose.js')
// mongoose()

var app = express()
var router = express.Router()

// 路由转发
var index = require('./routers/index.server.router')

// 使用中间件
app.use('/static', express.static(__dirname + '/public')) // 指定public为静态文件目录
// bodyParser设置解析http请求体
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// 监听请求并转发
app.use('/', index)

// 监听3000端口
app.listen(config.port, function () {
	console.log('listening on port '+ config.port +'!')
})

module.exports = app