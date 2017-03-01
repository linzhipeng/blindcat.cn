// 注册新用户

var express = require('express')
var bodyParser = require('body-parser')
var config = require('../config/config.js')
var userCheck = require('../common/userCheck.js')
var verifyCodeEmailClass = require('../common/verifyCodeEmailClass.js')
var mongoose = require('mongoose')
var bcrypt = require("bcryptjs")
var Promise = require('bluebird')
mongoose.Promise = require('bluebird')

var user = mongoose.model('user')
var checkEmail = mongoose.model('checkEmail')

// 实例化模块
var app = express()
var router = express.Router()

// bodyParser设置解析http请求体
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

router
 .post('/', function(req, res, next) {
 	if (req.body) {
	 	var username = req.body.username
		var password = req.body.password
		var email = req.body.email
        var verifyCode = parseInt(req.body.verifyCode, 10)
		// 判断接收到的数据是否为空
        Promise
            // 检查用户数据合法性
            .all([
                userCheck.checkEmail(email),
                userCheck.checkUsername(username),
                userCheck.checkPassword(password),
                userCheck.checkVerifyCode(verifyCode)
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
            .then(() => {
                return checkEmail.findOne({'email': email}).exec()
            })
            .then(data => {
                if (data) {// 检查到邮件验证码缓存表中存在该验证码
                    if (data.verifyCode === verifyCode && data.codeType === 'register') {// 验证码正确且类型相符
                        return Promise.resolve()
                    } else if (data.codeType !== 'register') {// 验证码类型不符
                        return Promise.reject("请先点击获取邮箱验证码")
                    } else {// 验证码不正确
                        return Promise.reject("验证码不正确")
                    }
                } else {
                    return Promise.reject("请先点击获取邮箱验证码")
                }
            })
            // 存储用户数据
            .then(() => {
                // 密码进行加密存储
                var salt = bcrypt.genSaltSync(10);
                password = bcrypt.hashSync(password, salt);

                var userData = new user({
                    username: username,
                    password: password,
                    account: {
                        email: email
                    }
                })
                return userData.save()
            })
            .then(() => {
                var loginVerifyCodeClear = new verifyCodeEmailClass(email)
                loginVerifyCodeClear.clearCode()
                res.send({
                    'state': true,
                    'info': '注册成功！'
                })
            })
            // 捕捉返回错误信息
            .catch(e => {
                console.log(e)
                res.send({
                    'state': false,
                    'info': e
                })
            })
 	}
 })
module.exports = router