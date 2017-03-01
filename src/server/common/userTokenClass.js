// 生成并存储用户登录token
// userId + 时间戳 + 密文密码

var config = require('../config/config.js')
var Promise = require('bluebird')
var mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
var bcrypt = require("bcryptjs")
var user = mongoose.model('user')

var userTokenClass = (function () {
	function _userTokenClass (userId) {
		// 用户id
		// 安全模式
		if (!(this instanceof userTokenClass)) {
			return new userTokenClass(userId)
		}

		this.userId = userId || ''
	}

	_userTokenClass.prototype = {
		createToken: function () {
			return user
				.findOne({'_id': this.userId})
				.exec()
				.then(data => {
					if (data) {
						let nowTime = new Date().getTime()
						let tokenData = this.userId + nowTime + data.password
						// 存储token过期时间戳
						let tokenExpire = nowTime + (config.tokenExpireDays * 24 * 60 * 60 * 1000)
						// 加密生成token
						var salt = bcrypt.genSaltSync(10)
						token = bcrypt.hashSync(tokenData, salt)
						return Promise.resolve({
							'token': token,
							'tokenExpire': tokenExpire
						})
					} else {
						throw '用户不存在！'
					}
				})
				// 更新用户token信息 (new: true 是返回更新后的文档)
				.then((data) => {
					return user.findByIdAndUpdate(this.userId, { $set: data}, {new: true}).exec()
				})
				.then(data => {
					if (data) {
						return Promise.resolve({
							'token': data.token,
							'tokenExpire': data.tokenExpire
						})
					}
				})
				.catch(e => {
					return Promise.reject(e)
				})
		}
	}

	return _userTokenClass
})()

module.exports = userTokenClass