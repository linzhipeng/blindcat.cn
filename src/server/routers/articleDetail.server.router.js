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
		if (req.query.id && req.query.id !== ''){
			article
				.findOne({'_id': req.query.id})
				.exec(function(err, articleData){
					if(err) return err;
					data = {
						'state': true,
						'data': articleData
					}
					res.send(data)
				})
		} else {
			res.send({
				'state': false,
				'info': '未收到请求id'
			})
		}
	})
module.exports = router