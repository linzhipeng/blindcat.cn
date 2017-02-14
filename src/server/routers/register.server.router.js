// 注册新用户

var express = require('express')
var bodyParser = require('body-parser')
var config = require('../config/config.js')
var mongoose = require('mongoose')
var bcrypt = require("bcryptjs")

var user = mongoose.model('user')

// 实例化模块
var app = express()
var router = express.Router()

// bodyParser设置解析http请求体
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))
var data
router
 .post('/', function(req, res, next) {
 	if (req.body) {
	 	var username = req.body.username
		var password = req.body.password
		var email = req.body.email
		// 判断接收到的数据是否为空
 		if (!username || username === '') {
 			res.send({
 				'state': false,
 				'info': '用户名不能为空'
 			})
 			return false
 		} else if (!password || password === '') {
 			res.send({
 				'state': false,
 				'info': '密码不能为空'
 			})
 			return false
 		} else if (!email || email === '') {
 			res.send({
 				'state': false,
 				'info': '邮箱不能为空'
 			})
 			return false
 		}
 		// 判断数据库是否已经存在该昵称/邮箱
 		user
 			.findOne({'username': username})
 			.exec(function (err, data) {
 				if (err) {
 					console.log(err)
 				}
 				if (data) {
 					res.send({
 						'state': false,
 						'info': '用户名已存在！'
 					})
 					return false
 				}
 			})
 		user
 			.findOne({'account.email': email})
 			.exec(function (err, data) {
 				if (err) {
 					console.log(err)
 				}
 				if (data) {
 					res.send({
 						'state': false,
 						'info': '邮箱已存在！'
 					})
 					return false
 				}
 			})
 		// 密码进行加密存储
 		var salt = bcrypt.genSaltSync(10);
 		password = bcrypt.hashSync(password, salt);
 		// 存储用户数据
 		var userData = new user({
 			username: username,
 			password: password,
 			account: {
 				email: email
 			},
 			token: '123',
 			tokenExpire: 123
 		})
 		userData.save(function (err) {
 			if (err) {
 				if (err) {
 					res.send({
 						'state': false,
 						'info': '失败！'
 					})
 					return false
 				}
 			} else {
 				res.send({
 					'state': true,
 					'info': '成功！'
 				})
 				return true
 			}
 		})
 	}
 })
module.exports = router