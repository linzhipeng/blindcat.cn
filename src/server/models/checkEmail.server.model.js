// 【邮件验证码验证信息缓存表】数据表数据模型文件

var mongoose = require('mongoose')
// 验证邮箱
// 验证码
// 验证码过期时间戳
// 上一次验证时间戳
// 今日已使用验证次数

var checkEmailSchema = new mongoose.Schema({
	email: {// 验证邮箱
		type: String,
		required: true,
		unique: true
	},
	verifyCode: {// 验证码
		type: Number,
		required: true,
		unique: true
	},
	codeExpire: {// 验证码过期时间戳
		type: String,
	},
	lastTime: {// 上一次验证时间戳
		type: Number,
		required: true,
		unique: true
	},
	useTimes: {// 今日已使用验证次数
		type: Number,
		required: true,
		default: 1
	},
	codeType: {// codeType：验证码用途类型【注册、修改密码、修改邮箱】
		type: String,
		required: true,
		default: '注册'
	}
})

mongoose.model('checkEmail', checkEmailSchema)