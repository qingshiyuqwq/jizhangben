const express = require('express')
const router = express.Router()
// 导入用户模型
const UserModel = require('../../models/UserModel')
const md5 = require('md5')

// 注册
router.get('/reg', (req, res) => {
    // 响应 HTML 内容
    res.render('auth/reg')
})

router.post('/reg', (req, res) => {
    // 将用户信息添加至数据库
    UserModel.create({
        ...req.body,
        password: md5(req.body.password)
    }).then(value => {
        res.render('success',{msg: '注册成功', url: '/login'})
    }).catch(err => {
        res.status(500).send('注册失败')
    })
})

router.get('/login', (req, res) => {
    // 响应 HTML 内容
    res.render('auth/login')
})

router.post('/login', (req, res) => {
    // 获取用户名和密码
    let {username,password} = req.body
    // 查询数据库
    UserModel.findOne({username: username, password: md5( password)}).then(value => {
        if(!value){
           return res.send('账号或密码错误')
        }

        // 写入session
        req.session.username = value.username
        req.session._id = value._id

        res.render('success',{msg: '登录成功', url: '/account'})
    }).catch(err => {
        res.status(500).send('登录失败~~')
    })
})

router.post('/logout', (req,res) => {
    // 销毁session
    req.session.destroy(() => {
        res.render('success', {msg: '退出成功', url: '/login'})
    })
})

module.exports = router