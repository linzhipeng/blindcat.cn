// 接收用户上传的头像并存储

var express = require('express')
var Promise = require('bluebird')
var fs = require("fs")
fs.stat = Promise.promisify(fs.stat)
fs.mkdir = Promise.promisify(fs.mkdir)
var multer = require("multer")
var bodyParser = require('body-parser')
var confug = require('../config/config.js')
var userTokenClass = require('../common/userTokenClass.js')

// 实例化模块
var app = express()
var router = express.Router()

// bodyParser设置解析http请求体
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))
// router.use(multer({ dest: 'uploads/' }).single('avatar'))

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let userId = req.headers.userid
        let token = req.headers.token
        let destDir = 'uploads/'+ userId +'/'
        var checkUser = new userTokenClass(userId, token)
        // 查询当前用户是否已经登录
        checkUser.checkToken()
            // 查询当前路径是否存在)  
            .then(() => {
                return fs.stat(destDir)
            })
            // 路径已存在
            .then(stats => {
                if (stats.isDirectory()) {// 目录路径已存在
                    return Promise.resolve()
                }
            })
            .catch(e => {
                if (e.cause) {
                    if (e.cause.code === 'ENOENT') {// 目录不存在
                        // 创建目录
                        fs.mkdir(destDir)
                    } else {// 发生其他错误
                        return Promise.reject(e)
                    }
                } else {
                    return Promise.reject(e)
                }
            })
            .then(() => {// 定义存储目录
                cb(null, destDir)
            })
            .catch(e => {// 错误处理
                cb(e)
            })
    },
    filename: function (req, file, cb) {
        // 重命名文件：fieldname + 时间戳 + 后缀名
        let suffix  = file.originalname.split('.')
        cb(null, file.fieldname + '-' + Date.now() + '.' + suffix[suffix.length - 1])
    }
})
var upload = multer({ storage: storage }).single('avatar')

router
    .post('/', function (req, res, next) {
        // 调用中间件程序，捕捉multer发出的错误
        upload(req, res, function (err) {
            if (err) {
                res.send({
                    state: false,
                    info: err
                })
            } else {
                res.send({
                    state: true,
                    info: '文件上传成功'
                })
            }
        })
    });

module.exports = router