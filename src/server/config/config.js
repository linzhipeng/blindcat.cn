module.exports = {
	// 服务器监听地址
	port: 8080,
	// 当前的域名
	domain: 'http://localhost',
	// 数据库地址
	mongodb: 'mongodb://blindcatvue:blindcatVue@localhost/vue',
	// 登录session配置
	loginSession: {
		secret: 'blindcat',
		cookie: {maxAge: 60 * 1000 * 30}
	},
	hashKey: 'blindcat',
}