// 【文章】数据表数据模型文件
var mongoose = require('mongoose')
// 作者id
// 文章标题
// 文章预览图
// 文章内容
// 文章标签
// 创作类型
// 文章分类

// 摘要
// 发布时间
// 阅读数
// 收藏数
// 点赞数
// 审核状态
var articleSchema = new mongoose.Schema({
	writer: { // 作者id
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user'
	},
	title: { // 文章标题
		type: String,
		required: true
	},
	preview: { // 文章预览图
		type: String
	},
	content: { // 文章内容
		type: String,
		required: true
	},
	abstract: {// 摘要
		type: String,
		required: true
	},
	tags: { // 文章标签
		type: Array
	},
	creativeType: {// 创作类型
		type: String,
		default: '原创'
	},
	articleType: { // 文章分类
		type: String,
		required: true
	},
	publishTime: { // 发布时间
		type: Date,
		default: Date.now
	},
	readTimes: { // 阅读数
		type: Number,
		default: 0
	},
	aticleCollect: { // 收藏数
		type: Number,
		default: 0
	},
	likeNum: { // 点赞数
		type: Number,
		default: 0
	},
	auditStatus: {// 审核状态
		type: Number,
		default: 0
	}
})

mongoose.model('article', articleSchema)