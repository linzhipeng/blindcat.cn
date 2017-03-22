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

let articleListData = {}
// 文章查询函数 (查询语句, 查询页码, 每页文章数, 查询列表类型, http res)
let searchArticle = function (searchQuery, pageNum, articleNum, searchType, res) {
	// pageNum、articleNum转为正整数
	pageNum = (parseInt(pageNum) > 0) ? parseInt(pageNum) : 1
	articleNum = (parseInt(articleNum) > 0) ? parseInt(articleNum) : 10

	// 查询符合条件的文章数
	return article.find(searchQuery).where({auditStatus: 1}).count().exec()
		.then(data => {
			if (data > 0) { // 如果文章数大于0
				articleListData.articleCount = data
				// 根据每页文章数计算总页数
				articleListData.pageCount = Math.ceil(data / articleNum)
				// 查询页码超过已拥有的文章页数
				if (articleListData.pageCount < pageNum) {
					return Promise.reject('找不到对应页码的文章！')
				}
				// 查询符合条件的文章列表
				return article
					.find(searchQuery)
					.where({auditStatus: 1})
					.skip((pageNum - 1) * articleNum)
					.select('_id title abstract publishTime readTimes aticleCollect likeNum tags writer')
					.limit(articleNum)
					.sort([['publishTime', -1]])
					.populate('writer', '_id username account.email')
					.exec()
			} else {
				articleListData.articleCount = 0
				articleListData.pageCount = 0
				return Promise.resolve('')
			}
		})
		.then(data => {
			articleListData.listData = data // 文章列表数据
			articleListData.searchType = searchType // 文章列表类型['all', 'writer', 'tags']
			articleListData.pageNum = pageNum // 当前查询页码
			res.send({
				state: true,
				data: articleListData
			})
		})
		.catch(e => {
			res.send({
				state: false,
				data: e
			})
		})
}

router
	.get('/', function(req, res){
		// 对象解构赋值
		// pageNum  —— 第几页（默认1）
		// articleNum  —— 每页规定文章数（默认10）
		let {pageNum = 1, articleNum = 10} = req.query

		searchArticle({}, pageNum, articleNum, 'all', res)
	})
	.get('/tags', function(req, res){
		// 对象解构赋值
		// pageNum  —— 第几页（默认1）
		// articleNum  —— 每页规定文章数（默认10）
		// tags  ——文章标签（all表示全部文章）
		let {pageNum = 1, articleNum = 10, tags = '推荐'} = req.query
		
		searchArticle({'tags': {$all: [tags]}}, pageNum, articleNum, 'tags', res)
	})
	.get('/writer', function(req, res){
		// 对象解构赋值
		// pageNum  —— 第几页（默认1）
		// articleNum  —— 每页规定文章数（默认10）
		// writerId ——作者Id，使用作者Id查询文章列表时不得为空
		let {pageNum = 1, articleNum = 10, writerId = ''} = req.query

		// 如果查询类型为writer而作者Id格式不符合，则返回错误
		if (!writerId.match(/^[0-9a-fA-F]{24}$/)) {
			res.send({
				'state': false,
				'info': '作者Id错误'
			})
			return false
		}
		
		searchArticle({'writer': writerId}, pageNum, articleNum, 'writer', res)
	})
module.exports = router