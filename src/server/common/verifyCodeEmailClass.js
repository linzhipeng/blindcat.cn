// 邮箱验证码公共类方法

var config = require('../config/config.js')
var userCheck = require('../common/userCheck.js')
var Promise = require('bluebird')
var mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
var bcrypt = require("bcryptjs")
Promise.promisifyAll(require('nodemailer'))
var nodemailer = require('nodemailer')
var checkEmail = mongoose.model('checkEmail')
var user = mongoose.model('user')

var verifyCodeEmailClass = (function(){
    function _verifyCodeEmailClass (email, codeType) {
        // codeType：验证码用途类型【注册、修改密码、修改邮箱】
        // 安全模式
        if (!(this instanceof verifyCodeEmailClass)) {
            return new verifyCodeEmailClass(name)
        }
        this.email = email || ''
        this.codeType = codeType || ''
        this.verifyCode = parseInt(Math.random()*900000 + 100000, 10)
    }

    _verifyCodeEmailClass.prototype = {
        // 向指定用户发送指定类型的邮箱验证码
        sendCode: function () {
            return Promise
                .resolve(() => {// 验证当前邮箱格式是否正确
                    userCheck.checkEmail(this.email)
                })
                .then(() => {// 根据codeType选择是否需要判断该邮箱是否已注册
                    return userCheck.checkDbEmail(this.email)
                })
                .then(data => {
                    if (data && this.codeType === 'register') {// 该用户已注册且codeType为register
                        return Promise.reject('该邮箱已经被注册！')
                    } else if (!data && this.codeType !== 'register') {// 该用户未注册且codeType不是register
                        return Promise.reject('该邮箱尚未注册！')
                    } else {
                        return checkEmail
                            .findOne({'email': this.email})
                            .exec()
                    }
                })
                .then(data => {
                    var nowTime = new Date().getTime()
                    var nowTimeDate = parseInt(nowTime/(1000 * 60 * 60 * 24), 10)
                    var emailData = {
                        email: this.email,
                        verifyCode: this.verifyCode,
                        codeExpire: parseInt(nowTime + (30 * 60 * 1000), 10),
                        lastTime: nowTime,
                        useTimes: 1,
                        codeType: this.codeType
                    }
                    // 如果邮件验证
                    if (data) {// 如果已经存在该邮箱的验证缓存
                        var lastTimeDate = parseInt(data.lastTime/(1000 * 60 * 60 * 24), 10)
                        if (nowTime - data.lastTime < config.verifyCode.waitingTime * 60 * 1000 && nowTime - data.lastTime > 0) {// 判断上次使用邮件验证是否在一分钟内
                            return Promise.reject('您的手速太快，请稍后再重新发送邮件。')
                        } else if (lastTimeDate === nowTimeDate) {// 上一次验证是在今天验证的
                            if (data.useTimes >= config.verifyCode.useTimes) {// 今天的验证次数已经超过限制
                                return Promise.reject('您的验证频率过于频繁！请明天再试！')
                            } else {// 今天的验证次数没有超过限制
                                emailData.useTimes = data.useTimes + 1
                                return checkEmail.findByIdAndUpdate(data._id, { $set: emailData}, {new: true})
                            }
                        } else {// 上一次验证不是今天
                            return checkEmail.findByIdAndUpdate(data._id, { $set: emailData}, {new: true})
                        }
                    } else {// 不存在该邮箱的验证缓存则新增加缓存
                        var newCheckEmailData = new checkEmail(emailData)
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
                                "user": config.verifyCode.user, // user name
                                "pass": config.verifyCode.pass         // password
                            }
                        });

                        var mailOptions = {
                            from: config.verifyCode.mailOptions.from, // sender address mailfrom must be same with the user
                            to: this.email, // list of receivers
                            subject: config.verifyCode.mailOptions.subject, // Subject line
                            html: '<p style="font-size:16px;">您正使用此邮箱注册为【瞎猫网】新用户。<br>为确保是您本人的操作，您已选择通过该邮件地址获取验证码验证身份。请在邮件验证码输入框输入下方的验证码：</p>\
                            <h1 style="color:#41b883;"><b>' + this.verifyCode + '</b></h1>\
                            <p style="font-size:16px;">如果该操纵非您本人所为，请忽略该该邮件。</p>', 
                        };

                        // send mail with defined transport object
                        transporter.sendMail(mailOptions)
                    } else {
                        return Promise.reject('验证码存储失败！')
                    }
                })
                .then(info => {
                    return Promise.resolve({
                        'state': true,
                        'info': '获取验证码成功!'
                    })
                })
                .catch(e => {
                    return Promise.reject({
                        'state': false,
                        'info': e
                    })
                })
        },

        // 清除指定用户的邮箱验证码缓存表
        clearCode: function () {
            checkEmail
                .remove({email: this.email})
                .then(data => {
                    return true
                })
                .catch(e => {
                    console.log(e)
                })
        }
    }

    return _verifyCodeEmailClass
})()

module.exports = verifyCodeEmailClass
