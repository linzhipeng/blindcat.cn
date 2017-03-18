// 接收用户上传的头像并存储

var express = require('express')
var Promise = require('bluebird')
var mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
var fs = require("fs")
fs.stat = Promise.promisify(fs.stat)
fs.mkdir = Promise.promisify(fs.mkdir)
fs.readdir = Promise.promisify(fs.readdir)
var multer = require("multer")
var bodyParser = require('body-parser')
var confug = require('../config/config.js')
var userTokenClass = require('../common/userTokenClass.js')

var user = mongoose.model('user')

// 实例化模块
var app = express()
var router = express.Router()

// bodyParser设置解析http请求体
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let userId = req.headers.userid.match(/^[0-9a-fA-F]{24}$/) ? req.headers.userid : ''
        let token = req.headers.token || ''
        let destDir = 'public/users/'+ userId +'/'
        var checkUser = new userTokenClass(userId, token)
        if (!userId || !token) {
            cb('请先进行登录！')
            return false
        }
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
                if (err.code && err.code === 403) {
                    res
                        .status(403)
                        .send({
                            state: false,
                            info: err.info
                        })
                } else {
                    res.send({
                        state: false,
                        info: err
                    })
                }
            } else {
                // 判断是否有文件被接收
                if (req.file) {
                    // 存储上传的新头像地址
                    user
                        .findByIdAndUpdate(req.headers.userid, { $set: {
                            'avatar': 'static/users/' + req.headers.userid + '/' +req.file.filename
                        }}, {new: true})
                        .exec()
                        .then(data => {
                            if (data) {
                                res.send({
                                    state: true,
                                    info: '头像修改成功',
                                    data: {
                                        url: data.avatar
                                    }
                                })
                                // 删除旧头像
                                fs.readdir('public/users/' + req.headers.userid)
                                    .then(files => {
                                        files.forEach( function (file){
                                            if (file !== req.file.filename) {
                                                fs.unlink('public/users/' + req.headers.userid + '/' +file, function(err) {
                                                    if (err) {
                                                        console.log(e)
                                                    }
                                                })
                                            }
                                        })
                                    })
                                    .catch(e => {
                                        console.log(e)
                                    })
                            } else {
                                res.send({
                                    state: false,
                                    info: '存储头像路径失败！'
                                })
                            }
                        })
                        .catch(e => {
                            res.send({
                                state: false,
                                info: e
                            })
                        })
                } else {
                    res.send({
                        state: false,
                        info: '未收到任何图片文件'
                    })
                }
            }
        })
    });

module.exports = router