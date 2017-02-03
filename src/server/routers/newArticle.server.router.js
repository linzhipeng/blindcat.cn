// 模块引入
var express = require('express')
var bodyParser = require('body-parser')
var config = require('../config/config.js')
var mongoose = require('mongoose')

var article = mongoose.model('article')

// 实例化模块
var app = express()
var router = express.Router()

// bodyParser设置解析http请求体
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

// 路由器接收转发数据
router
	.get('/', function(req, res, next) {
		res.render('newArticle', {
			title: '瞎猫--添加文章',
		})
	})
	.post('/', function(req, res, next) {
		var reg = /[\\\`\*\_\[\]\#\+\-\!\>]/g;
		var saveData = new article({
			title: req.body.title,
			content: req.body.content,
			tags: req.body.tags,
			articleType: req.body.articleType,
			creativeType: req.body.creativeType,
			abstract: req.body.content.replace(reg, "")
		})
		saveData.save(function(err){
			if (err) {
				console.log(err)
				return false
			}
			res.send({
				'state': true,
				'info': '投稿成功！'
			})
		})
	})

module.exports = router