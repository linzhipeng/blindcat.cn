// 接收用户上传的头像并存储

var express = require('express')
var Promise = require('bluebird')
var fs = require("fs")
fs.stat = Promise.promisify(fs.stat)
fs.mkdir = Promise.promisify(fs.mkdir)
var multer = require("multer")
var bodyParser = require('body-parser')
var confug = require('../config/config.js')
var userCheck = require('../common/userCheck.js')

// 实例化模块
var app = express()
var router = express.Router()

// bodyParser设置解析http请求体
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))
// router.use(multer({ dest: 'uploads/' }).single('avatar'))

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let destDir = 'uploads/'+ req.headers.userid +'/'
        fs
            .stat(destDir)// 查询当前路径是否存在
            .then(stats => {// 路径已存在
                if (stats.isDirectory()) {// 目录路径已存在
                    Promise.resolve()
                }
            })
            .catch(e => {
                if (e.code === 'ENOENT') {// 目录不存在
                    // 创建目录
                    fs.mkdir(destDir)
                } else {// 发生错误
                    Promise.reject(e)
                }
            })
            .then(() => {// 定义存储目录
                cb(null, destDir)
            })
            .catch(e => {
                console.log(e)
            })
    },
    filename: function (req, file, cb) {
        // 重命名文件：fieldname + 时间戳 + 后缀名
        let suffix  = file.originalname.split('.')
        cb(null, file.fieldname + '-' + Date.now() + '.' + suffix[suffix.length - 1])
    }
})
var upload = multer({ storage: storage })

router
    .post('/', upload.single('avatar'), function (req, res, next) {
        if (req.file) {
            res.send({
                state: true,
                info: '文件上传成功'
            })
        } else {
            res.send({
                state: false,
                info: '文件上传失败！'
            })
        }
    });

module.exports = router