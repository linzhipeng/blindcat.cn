// 模块引入
var express = require('express');
var bodyParser = require('body-parser');
var config = require('../config/config.js');

// 实例化模块
var app = express();
var router = express.Router();

// bodyParser设置解析http请求体
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
var data = {
	'succeed': true,
}
// 路由器接收转发数据
router
	.get('/', function(req, res){
		res.send(data);
	})

module.exports = router;