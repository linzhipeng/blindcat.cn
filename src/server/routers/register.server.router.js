// 注册新用户

var express = require('express')
var bodyParser = require('body-parser')
var config = require('../config/config.js')
var userCheck = require('../common/userCheck.js')
var mongoose = require('mongoose')
var bcrypt = require("bcryptjs")
var Promise = require('bluebird')
mongoose.Promise = require('bluebird')

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
        Promise
            // 检查用户数据合法性
            .all([
                userCheck.checkEmail(email),
                userCheck.checkUsername(username),
                userCheck.checkPassword(password)
            ])
            // 检查用户数据在数据库中是否已存在
            .then(() => {
                return userCheck.checkDbUsername(username)
            })
            .then(data => {
                if (data) {
                    return Promise.reject("用户名已存在")
                } else {
                    return Promise.resolve()
                }
            })
            .then(() => {
                return userCheck.checkDbEmail(email)
            })
            .then(data => {
                if (data) {
                    return Promise.reject("邮箱已存在")
                } else {
                    return Promise.resolve()
                }
            })
            // 存储用户数据
            .then(data => {
                // 密码进行加密存储
                var salt = bcrypt.genSaltSync(10);
                password = bcrypt.hashSync(password, salt);

                var userData = new user({
                    username: username,
                    password: password,
                    account: {
                        email: email
                    },
                    token: '123',
                    tokenExpire: 123
                })
                return userData.save()
            })
            .then(() => {
                res.send({
                    'state': true,
                    'info': '注册成功！'
                })
            })
            // 捕捉返回错误信息
            .catch((e) => {
                res.send({
                    'state': false,
                    'info': e
                })
            })
 	}
 })
module.exports = router