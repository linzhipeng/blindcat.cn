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
		if (req.body) {
			if (!req.body.title || req.body.title === '') {
				res.send({
					'state': false,
					'info': '文章标题不能为空'
				})
				return false
			} else if (!req.body.content || req.body.content === '') {
				res.send({
					'state': false,
					'info': '文章正文不能为空'
				})
				return false
			} else if (!req.body.articleType || req.body.articleType === '') {
				res.send({
					'state': false,
					'info': '文章分类不能为空'
				})
				return false
			} else if (!req.body.creativeType || req.body.creativeType === '') {
				req.body.creativeType = '原创'
			}
		} else {
			return false
		}
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