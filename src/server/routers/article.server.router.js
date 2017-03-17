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
		// 按照标签搜索
		let searchType = {};
		if (req.query.types) {
			searchType = {'tags': {$all: [req.query.types]}}
		}
		// 对象解构赋值
		// pageNum  —— 第几页（默认1）
		// articleNum  —— 每页规定文章数（默认10）
		let {pageNum = 1, articleNum = 10} = req.query
		// 转为整型、正整数
		pageNum = (parseInt(pageNum) > 0) ? parseInt(pageNum) : 1
		articleNum = (parseInt(articleNum) > 0) ? parseInt(articleNum) : 10
		
		article
			.find(searchType)
			.skip((pageNum - 1) * articleNum)
			.limit(articleNum)
			.select('_id title abstract publishTime readTimes aticleCollect likeNum tags')
			.sort([['publishTime', -1]])
			.exec(function(err, aticle){
				if(err) return handleError(err);
				res.send({
					'state': true,
					'data': aticle
				})
			})
	})
module.exports = router