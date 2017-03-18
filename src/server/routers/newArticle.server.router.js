// 模块引入
var express = require('express')
var bodyParser = require('body-parser')
var config = require('../config/config.js')
var userTokenClass = require('../common/userTokenClass.js')
var mongoose = require('mongoose')
var Promise = require('bluebird')
mongoose.Promise = require('bluebird')

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
		let userId = req.headers.userid.match(/^[0-9a-fA-F]{24}$/) ? req.headers.userid : ''
        let token = req.headers.token || ''
		let checkUser = new userTokenClass(userId, token)

		checkUser.checkToken()
			.then(() => {
				if (!req.body.title || req.body.title === '') {
					return Promise.reject('文章标题不能为空')
				} else if (!req.body.content || req.body.content === '') {
					return Promise.reject('文章正文不能为空')
				} else if (!req.body.articleType || req.body.articleType === '') {
					return Promise.reject('文章分类不能为空')
				} else if (!req.body.creativeType || req.body.creativeType === '') {
					req.body.creativeType = '原创'
				}
				return Promise.resolve()
			})
			.then(() => {
				function stringMaxCut(str, maxNum){
					var len = 0;
					for (var i=0; i<str.length; i++) {  
						if (str.charCodeAt(i)>127 || str.charCodeAt(i)==94) {
							len += 2;
						} else {
							len ++;
						}
						if(len == maxNum){
							return str = str.slice(0, (i+1)) + '..';
						}else if(len == maxNum+1){
							return str = str.slice(0, i) + '..';
						}
					};
					return str;
				}
				var reg = /[\\\`\*\_\[\]\#\+\-\!\>]/g;
				var saveData = new article({
					title: req.body.title,
					content: req.body.content,
					tags: req.body.tags,
					articleType: req.body.articleType,
					creativeType: req.body.creativeType,
					abstract: stringMaxCut(req.body.content.replace(reg, ""), 250)
				})

				return saveData.save()
			})
			.then(data => {
				res.send({
					'state': true,
					'info': '投稿成功！'
				})
			})
			.catch(e => {
				if (e.code === 403) {
					res
						.status(403)
						.send({
							state: false,
							info: e.info
						})
				} else {
					res.send({
						state: false,
						info: e
					})
				}
			})
	})

module.exports = router