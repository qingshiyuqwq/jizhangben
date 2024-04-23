const mongoose = require('mongoose')
let UserSchema = new mongoose.Schema({
    // 用户名
    username: String,
    // 密码
    password: String

})

let UserModel = mongoose.model('users',UserSchema)

module.exports = UserModel