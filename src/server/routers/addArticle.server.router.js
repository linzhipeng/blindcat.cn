// 模块引入
var express = require('express');
var bodyParser = require('body-parser');
var config = require('../config/config.js');
var mongoose = require('mongoose')

var article = mongoose.model('article')

// 实例化模块
var app = express();
var router = express.Router();

// bodyParser设置解析http请求体
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// 路由器接收转发数据
router
	.get('/', function(req, res, next) {
		res.render('addArticle', {
			title: '瞎猫--添加文章',
		});
	})
	.post('/', function(req, res, next) {
		var saveData = new article({
			title: req.body.title,
			content: req.body.content,
			abstract: req.body.abstract,
			tags: req.body.tags,
			type: req.body.type,
		})
		console.log(saveData)
		// saveData.save(function(err){
		// 	if (err) return handleError(err);
		// 	res.send({
		// 		'state': true
		// 	});
		// })
		res.redirect('../article');
	})

module.exports = router;