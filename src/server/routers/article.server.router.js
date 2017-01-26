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
		// 	title: '文章标题2',
		// 	content: '##这个又是文章的内容',
		// 	abstract: '这个又是文章摘要',
		// 	tags: '后端',
		// 	type: 'Node',
		// })
		// saveData.save(function(err){
		// 	if (err) return handleError(err);
		// })
		console.log(parseInt(req.query.page) || 1)
		article
			.find(['title', 'content', 'abstract'])
			// .skip(1)
			// .limit(10)
			.select('title content abstract')
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