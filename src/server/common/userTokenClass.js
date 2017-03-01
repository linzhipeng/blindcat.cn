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
		// 生成用户token凭证
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
		},

		// 检查并返回当前用户token凭证
		showToken: function () {
			return user
				.findOne({'_id': this.userId})
				.exec()
				.then(data => {
					if (data) {
						if (data.tokenExpire && data.token) {// 存在token过期时间
							var nowTimeToken = new Date().getTime()
							if (data.tokenExpire > nowTimeToken) {// token未过期，返回当前token
								return Promise.resolve(data.token)
							} else {// token已过期
								return Promise.reject('登录已过期，请重新登录！')
							}
						} else {// 不存在token过期时间
							return Promise.reject('请先进行登录')
						}
					} else {
						return Promise.reject('请先进行注册')
					}
				})
		}
	}

	return _userTokenClass
})()

module.exports = userTokenClass