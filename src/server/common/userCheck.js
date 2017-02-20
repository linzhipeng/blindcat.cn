// 检查用户数据合法性

var Promise = require('bluebird')
var mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
var user = mongoose.model('user')

module.exports = {
    checkUsername: (username) => {
        if (!username || username === '') {
            return Promise.reject('用户名不能为空')
        }else {
            return Promise.resolve()
        }
    },
    checkEmail: (email) => {
        if (!email || email === '') {
            return Promise.reject('邮箱不能为空')
        } else {
            return Promise.resolve()
        }
    },
    checkPassword: (password) => {
        if (!password || password === '') {
            return Promise.reject('密码不能为空')
        } else {
            return Promise.resolve()
        }
    },
}