var express = require('express')
var path = require('path')
var hbs = require('hbs');
var bodyParser = require('body-parser')
var config = require('./config/config.js')

// 引入mongoose模块配置并连接数据库
var mongoose = require('./config/mongoose.js')
mongoose()

var app = express()
var router = express.Router()

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
    else  next();
});

// 路由转发
var index = require('./routers/index.server.router')
var article = require('./routers/article.server.router')
var newArticle = require('./routers/newArticle.server.router')

// 设置使用handels模板引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

// 使用中间件
app.use('/static', express.static(__dirname + '/public')) // 指定public为静态文件目录
// bodyParser设置解析http请求体
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// 监听请求并转发
app.use('/', index)
app.use('/article', article)
app.use('/newarticle', newArticle)

// 监听端口
app.listen(config.port, function () {
	console.log('listening on port '+ config.port +'!')
})

module.exports = app