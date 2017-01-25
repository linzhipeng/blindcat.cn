var mongoose = require('mongoose')
var config = require('./config.js')

module.exports = function(){
	// 使用promise 避免多重嵌套的发生
	mongoose.Promise = global.Promise
	// 连接数据库
	var db = mongoose.connect(config.mongodb)
	// 数据库连接测试
	var dbDoc = mongoose.connection;
	dbDoc.on('error', console.error.bind(console, 'connection error:'));
	dbDoc.once('open', function() {
		console.log("mongoDB has been connected");
	})
	return db
}