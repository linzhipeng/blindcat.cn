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
		article
			// .find(['title', 'content', 'abstract'])
			.find({'tags': {$all: ['不错']}})
			// .skip(1)
			// .limit(10)
			.select('_id title abstract publishTime readTimes aticleCollect likeNum tags')
			.sort([['publishTime', -1]])
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