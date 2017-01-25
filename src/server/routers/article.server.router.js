// 模块引入
var express = require('express')
var bodyParser = require('body-parser')
var config = require('../config/config.js')
var mongoose = require('mongoose')

var article = mongoose.model('article')

// 实例化模块
var app = express()
var router = express.Router()

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))
var data
router
	.get('/', function(req, res){
		// var saveData = new article({
		// 	title: '文章标题',
		// 	content: '##这个是文章的内容',
		// 	abstract: '这个是文章摘要',
		// 	tags: '前端',
		// 	type: 'JavaScript',
		// })
		// saveData.save(function(err){
		// 	if (err) return handleError(err);
		// })
		console.log(parseInt(req.query.page) || 1)
		article
			.find({})
			.limit(10)
			.exec(function(err, aticle){
				if(err) return handleError(err);
				data = {
					'state': true,
					'data': aticle
				}
			})
		res.send(data)
	})
module.exports = router