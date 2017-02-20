var Promise = require('bluebird')
var mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
var user = mongoose.model('user')

module.exports = {
    checkDbUsername: (username) => {
        return user
            .findOne({'username': username})
            .exec()
    },
    checkDbEmail: (email) => {
        return user
            .findOne({'account.email': email})
            .exec()
    }
}