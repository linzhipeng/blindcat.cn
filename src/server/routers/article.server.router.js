// 模块引入
var express = require('express')
var bodyParser = require('body-parser')
var config = require('../config/config.js')
var mongoose = require('mongoose')
var Promise = require('bluebird')
mongoose.Promise = require('bluebird')

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
		if (req.query.tags  && req.query.tags !== 'all') {
			searchType = {'tags': {$all: [req.query.tags]}}
		}
		// 对象解构赋值
		// pageNum  —— 第几页（默认1）
		// articleNum  —— 每页规定文章数（默认10）
		let {pageNum = 1, articleNum = 10} = req.query
		// 转为整型、正整数
		pageNum = (parseInt(pageNum) > 0) ? parseInt(pageNum) : 1
		articleNum = (parseInt(articleNum) > 0) ? parseInt(articleNum) : 10
		
		let articleListData = {}
		// 查询符合条件的文章数
		article.find(searchType).count().exec()
			.then(data => {
				if (data > 0) { // 如果文章数大于0
					// 根据每页文章数计算总页数
					articleListData.pageCount = Math.ceil(data / articleNum)
					// 查询符合条件的文章列表
					return article
						.find(searchType)
						.skip((pageNum - 1) * articleNum)
						.limit(articleNum)
						.select('_id title abstract publishTime readTimes aticleCollect likeNum tags')
						.sort([['publishTime', -1]])
						.exec()
				} else {
					articleListData.pageCount = 0
					return Promise.resolve('')
				}
			})
			.then(data => {
				articleListData.listData = data
				res.send({
					'state': true,
					'data': articleListData
				})
			})
			.catch(err => {
				res.send({
					'state': false,
					'data': err
				})
			})
	})
module.exports = router