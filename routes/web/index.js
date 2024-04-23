const moment = require('moment')
const AccountModel = require('../../models/AccountModel')

// 导入检测登录中间件
const checkLoginMiddleware = require('../../middlewares/checkLoginMiddleware')

const express = require('express');
const router = express.Router();

// 首页路由规则
router.get('/', (req, res) => {
  // 重定向到 /account
  res.redirect('/account')
})

// 记账本的列表
router.get('/account', checkLoginMiddleware, function(req, res, next) {
  // 获取所有的账单信息
  AccountModel.find().sort({time: -1}).then(value=>{
    res.render('list',{accounts: value, moment: moment})
  }).catch(err => {
    res.status(500).send('读取失败~~')
  })
});

// 添加记录
router.get('/account/create', checkLoginMiddleware, function(req, res, next) {
  res.render('create')
});

// 新增记录
router.post('/account', checkLoginMiddleware, (req, res) => {
  // 获取请求体数据
  // console.log(req.body)
  // '2024-04-17' => moment => new Date()
  AccountModel.create({
    ...req.body,
    type: Number(req.body.type),
    // 修改time属性的值
    time: moment(req.body.time).toDate()
  }).then(value => {
    res.render('success', {msg: '添加成功',url: '/account'})
  }).catch(err => {
    res.status(500).send('插入失败~~')
  })
});

router.get('/account/:id', checkLoginMiddleware, (req, res) => {
  // 获取 params 的 id 参数
  let id = req.params.id
  // 删除
  AccountModel.deleteOne({_id: id}).then(value => {
    // 删除完成提示
    res.render('success', {msg: '删除成功',url: '/account'})
  }).catch(err => {
    res.status(500).send('删除失败~')
    return
  })
})

module.exports = router;
