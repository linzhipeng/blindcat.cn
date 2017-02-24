// 生成用户登录token
// username + 时间戳 + 密文密码

var Promise = require('bluebird')
var mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
var user = mongoose.model('user')
var bcrypt = require("bcryptjs")
var user = mongoose.model('user')


module.exports = {
	start: (username) => {
		user
			.findOne({'username': username})
			.exec()
			.then(data => {
				if (data) {
					console.log(data.password)
					return Promise.resolve(data.password)
				} else {
					return Promise.reject("找不到该用户！")
				}
			})
			.catch((e) => {
				console.log(e)
			})
	}
}