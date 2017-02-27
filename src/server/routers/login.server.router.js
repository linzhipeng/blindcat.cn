// 注册新用户

var express = require('express')
var bodyParser = require('body-parser')
var userCheck = require('../common/userCheck.js')
var giveToken = require('../common/giveToken.js')
var bcrypt = require("bcryptjs")
var Promise = require('bluebird')

// 实例化模块
var app = express()
var router = express.Router()

// bodyParser设置解析http请求体
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

router
 .post('/', function(req, res, next) {
 	if (req.body) {
		var password = req.body.password
		var email = req.body.email
		// 判断接收到的数据是否为空
        Promise
            // 检查用户数据合法性
            .all([
                userCheck.checkEmail(email),
                userCheck.checkPassword(password)
            ])
            // 检查用户数据在数据库中是否已存在
            .then(() => {
                return userCheck.checkDbEmail(email)
            })
            // 检查用户密码
            .then(data => {
                if (data) {
                    if (bcrypt.compareSync(password, data.password)) {
                        return Promise.resolve(data._id)
                    } else {
                        return Promise.reject('密码错误！')
                    }
                } else {
                    return Promise.reject('用户不存在！')
                }
            })
            // 根据userId 生成并存储用户token
            .then(userId => {
                return giveToken.start(userId)
            })
            // 返回登录成功后所需信息
            .then(userTokendata => {
                if (token) {
                    res.send({
                        'state': true,
                        'data': userTokendata
                    })
                } else {
                    return Promise.reject('生成token失败！')
                }
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