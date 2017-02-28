// 发送验证邮件

var express = require('express')
var bodyParser = require('body-parser')
var config = require('../config/config.js')
var userCheck = require('../common/userCheck.js')
var emailVerifyCode = require('../common/emailVerifyCode.js')
var Promise = require('bluebird')
var mongoose = require('mongoose')
var bcrypt = require("bcryptjs")
var Promise = require('bluebird')
mongoose.Promise = require('bluebird')

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
            var email = req.body.email
            var registerVerifyCodeSend = new emailVerifyCode(email, 'register')
            registerVerifyCodeSend.sendCode()
                .then(data => {
                    res.send(data)
                })
                .catch(data => {
                    res.send(data)
                })
        }
    })

module.exports = router