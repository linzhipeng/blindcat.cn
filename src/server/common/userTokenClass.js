// 生成并存储用户登录token
// userId + 时间戳 + 密文密码

var config = require('../config/config.js')
var Promise = require('bluebird')
var mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
var bcrypt = require("bcryptjs")
var user = mongoose.model('user')

var userTokenClass = (function () {
	function _userTokenClass (userId, token) {
		// 用户id
		// 安全模式
		if (!(this instanceof userTokenClass)) {
			return new userTokenClass(userId)
		}

		this.userId = userId || ''
		this.token = token || ''
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
							'tokenExpire': data.tokenExpire,
							'username': data.username,
							'userId': data._id,
							'account': {
								'email': data.account.email,
								'qq': data.account. qq || '',
								'wechat': data.account.wechat || '',
								'phone': data.account.phone || '',
							},
							'avatar': data.avatar,
							'userIntro': data.userIntro || '',
							'birthday': data.birthday || '',
						})
					}
				})
				.catch(e => {
					return Promise.reject(e)
				})
		},

		// 检查并返回当前用户token凭证及用户基本信息
		checkToken: function () {
			if (this.userId === '' || this.token === '') {
				return Promise.reject({
					'code': 403,
					'info': '验证出错！请登录后再操作！'
				})
			}
			return user
				.findOne({'_id': this.userId})
				.exec()
				.then(data => {
					if (data) {
						if (data.tokenExpire && data.token) {// 存在token过期时间
							var nowTimeToken = new Date().getTime()
							if (data.tokenExpire > nowTimeToken) {// token未过期，返回当前token
								if (data.token === this.token) {// token验证通过
									return Promise.resolve()
								} else {// token验证失败
									// this.clearToken()
									throw {
										'code': 403,
										'info': '验证出错！请重新登录尝试！'
									}
								}
							} else {// token已过期
								// this.clearToken()
								throw {
									'code': 403,
									'info': '登录已过期，请重新登录！'
								}
							}
						} else {// 不存在token
							throw {
								'code': 403,
								'info': '请先进行登录'
							}
						}
					} else {// 不存在该用户
						throw {
							'code': 403,
							'info': '请先进行注册'
						}
					}
				})
		},

		// 清除用户token数据
		clearToken: function () {
			user.findByIdAndUpdate(this.userId, { $set: {
				'token': '',
				'tokenExpire': ''
			}}, {new: true})
		}
	}

	return _userTokenClass
})()

module.exports = userTokenClass