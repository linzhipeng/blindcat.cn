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

router
	.get('/', function(req, res){
		let writerId = req.query.id
		if (!writerId || writerId === '') {
			return res.send({
				'state': false,
				'info': '未收到请求id'
			})
		} else if (!writerId.match(/^[0-9a-fA-F]{24}$/)) {
			return res.send({
				'state': false,
				'info': '用户id格式错误'
			})
		}
		article
			.findOne({'_id': req.query.id})
			.populate('writer', '_id username account.email')
			.exec()
			.then(data => {
				res.send({
					'state': true,
					'data': data
				})
			})
			.catch (e => {
				res.send({
					'state': false,
					'info': e
				})
			})
	})
module.exports = router