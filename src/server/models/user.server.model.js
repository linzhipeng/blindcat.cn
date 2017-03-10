// 【用户信息】数据表数据模型文件
var mongoose = require('mongoose')
// _id即用户id
// 用户名
// 密码
// 用户token
// token到期时间戳
// 用户身份（1：普通用户，2：管理员）
// 头像地址
// 账号信息
	//email
	//QQ
	//微信
	//手机
// 注册时间
// 个人介绍
// 用户生日

var userSchema = new mongoose.Schema({
	username: {// 用户名
		type: String,
		required: true,
		unique: true
	},
	password: {// 密码
		type: String,
		required: true
	},
	token: {// 用户token
		type: String,
	},
	tokenExpire: {// token到期时间戳
		type: Number,
	},
	authority: {// 用户身份（1：普通用户，2：管理员）
		type: Number,
		default: 1
	},
	avatar: {// 头像地址
		type: String,
		default: '/static/images/blindcat.jpg'
	},
	account: {// 账号信息
		email: {type: String}, // email
		qq: {type: Number}, // QQ
		wechat: {type: String}, // 微信
		phone: {type: Number} // 手机
	},
	registerTime: {// 注册时间
		type: Date,
		default: Date.now
	},
	userIntro: {// 个人介绍
		type: String,
		default: '这个作者很懒，什么也没留下！'
	},
	birthday: {// 用户生日
		type: String,
	}
})

mongoose.model('user', userSchema)