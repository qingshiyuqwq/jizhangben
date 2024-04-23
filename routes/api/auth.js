const express = require('express')
const router = express.Router()
// 导入用户模型
const UserModel = require('../../models/UserModel')
const md5 = require('md5')
const {secret} = require('../../config/config')

// 导入
const jwt = require('jsonwebtoken')

router.post('/login', (req, res) => {
    // 获取用户名和密码
    let {username,password} = req.body
    // 查询数据库
    UserModel.findOne({username: username, password: md5( password)}).then(value => {
        if(!value){
            return res.json({
                code: '2002',
                msg: '用户名或密码错误~~~',
                data: null
            })
        }

        // 生成token
        const token = jwt.sign({
            _id: value._id,
            username: value.username
        }, secret, {
            expiresIn: 60 * 60 * 24 * 7
        })

        //响应token
        res.json({
            code: '0000',
            msg: '登陆成功',
            data: token
        })

    }).catch(err => {
        res.json({
            code: '2001',
            msg: '数据库读取失败~~~',
            data: null
        })
    })
})

router.post('/logout', (req,res) => {
    // 销毁session
    req.session.destroy(() => {
        res.render('success', {msg: '退出成功', url: '/login'})
    })
})

module.exports = router