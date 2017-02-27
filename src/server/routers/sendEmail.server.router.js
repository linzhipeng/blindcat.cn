// 发送验证邮件

var express = require('express')
var bodyParser = require('body-parser')
var config = require('../config/config.js')
var userCheck = require('../common/userCheck.js')
var Promise = require('bluebird')
var nodemailer = require('nodemailer');
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
            // 生成大于等于100000的随机6位数字验证码
            var verifyCode = parseInt(Math.random()*900000 + 100000, 10)
            Promise
                .resolve(() => {// 验证当前邮箱格式是否正确
                    userCheck.checkEmail(email)
                })
                .then(() => {
                    return checkEmail
                        .findOne({'email': email})
                        .exec()
                })
                .then(data => {
                    var nowTime = new Date().getTime()
                    var nowTimeDate = parseInt(nowTime/(1000 * 60 * 60 * 24), 10)
                    // 如果邮件验证
                    if (data) {// 判断是否已经存在该邮箱的验证缓存
                        var lastTimeDate = parseInt(data.lastTime/(1000 * 60 * 60 * 24), 10)
                        if (nowTime - data.lastTime < 60 * 1000) {// 判断上次使用邮件验证是否在一分钟内
                            return Promise.reject('您的手速太快，请稍后再重新发送邮件。')
                        } else if (lastTimeDate === nowTimeDate) {// 比较确认上一次验证是否在今天验证的
                            if (data.useTimes >= 20) {
                                return Promise.reject('您的验证频率过于频繁！请明天再试！')
                            } else {
                                return checkEmail.findByIdAndUpdate(data._id, { $set: {
                                    verifyCode: verifyCode,
                                    codeExpire: parseInt(nowTime + (30 * 60 * 1000), 10),
                                    lastTime: nowTime,
                                    useTimes: data.useTimes + 1,
                                }}, {new: true})
                            }
                        } else {// 上一次验证不是今天
                            return checkEmail.findByIdAndUpdate(data._id, { $set: {
                                verifyCode: verifyCode,
                                codeExpire: parseInt(nowTime + (30 * 60 * 1000), 10),
                                lastTime: nowTime,
                                useTimes: 1,
                            }}, {new: true})
                        }
                    } else {// 不存在该邮箱的验证缓存则新增加缓存
                        var newCheckEmailData = new checkEmail({
                            email: email,
                            verifyCode: verifyCode,
                            codeExpire: parseInt(nowTime + (30 * 60 * 1000), 10),
                            lastTime: nowTime,
                            useTimes: 1,
                        })
                        return newCheckEmailData.save()
                    }
                })
                .then(data => {
                    if (data) {// 如果成功缓存该邮箱的验证码数据，则将验证码发给用户
                        var transporter = nodemailer.createTransport({
                            "host": "smtpdm.aliyun.com",
                            "port": 25,
                            "secureConnection": true, // use SSL
                            "auth": {
                                "user": 'linzhipeng@blindcat.cn', // user name
                                "pass": 'LZP131126lzp'         // password
                            }
                        });

                        var mailOptions = {
                            from: '瞎猫<linzhipeng@blindcat.cn>', // sender address mailfrom must be same with the user
                            to: req.body.email, // list of receivers
                            subject: '【瞎猫网】使用邮件验证码验证您的身份', // Subject line
                            html: '<p style="font-size:16px;">您正使用此邮箱注册为【瞎猫网】新用户。<br>为确保是您本人的操作，您已选择通过该邮件地址获取验证码验证身份。请在邮件验证码输入框输入下方的验证码：</p>\
                            <h1 style="color:#41b883;"><b>' + verifyCode + '</b></h1>\
                            <p style="font-size:16px;">如果该操纵非您本人所为，请忽略该该邮件。</p>', 
                        };

                        // send mail with defined transport object
                        transporter.sendMail(mailOptions, function(error, info){
                            if(error){
                                return Promise.reject(error)
                            }
                            res.send({
                                'state': true,
                                'info': '获取验证码成功!'
                            })
                        })
                    }
                })
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