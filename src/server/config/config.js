module.exports = {
	// 服务器监听地址
	port: 8081,
	// 当前的域名
	domain: 'http://localhost',
	// 数据库地址
	mongodb: 'mongodb://blindcatvue:blindcatVue@localhost/vue',
	// token有效期（天）
	tokenExpireDays: 30,
	// 邮件验证码配置
	verifyCode: {
		// 邮件服务登录用户名
		user: 'linzhipeng@blindcat.cn',
		// 邮件服务登录密码
		pass: 'LZP12345lzp',
		// 验证码邮件内容配置
		mailOptions: {
			// 邮件发送人
			from: '瞎猫网<linzhipeng@blindcat.cn>',
			// 邮件标题
			subject: '【瞎猫网】使用邮件验证码验证您的身份'
		},
		// 邮件验证码请求频率限制（分钟）
		waitingTime: 0,
		// 邮件验证码每天使用次数限制（次）
		useTimes: 5
	}
}