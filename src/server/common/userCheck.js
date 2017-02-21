// 检查用户数据合法性

var Promise = require('bluebird')
var mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
var user = mongoose.model('user')

module.exports = {
    checkUsername: (username) => {
        if (!username || username === '') {
            return Promise.reject('用户名不能为空')
        } else {
            return Promise.resolve()
        }
    },
    checkEmail: (email) => {
        if (!email || email === '') {
            return Promise.reject('邮箱不能为空')
        } else {
            // 检查邮箱格式合法性
            var reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
            if (reg.test(email)) {
                return Promise.resolve()
            } else {
                return Promise.reject('邮箱格式有误')
            }
        }
    },
    checkPassword: (password) => {
        if (!password || password === '') {
            return Promise.reject('密码不能为空')
        } else if (password.length < 6) {
            return Promise.reject('密码长度不足6位')
        } else {
            return Promise.resolve()
        }
    },
    // 检查用户名在数据库中是否已存在
    checkDbUsername: (username) => {
        return user
            .findOne({'username': username})
            .exec()
    },
    // 检查昵称在数据库中是否已存在
    checkDbEmail: (email) => {
        return user
            .findOne({'account.email': email})
            .exec()
    }
}