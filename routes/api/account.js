var express = require('express');
var router = express.Router();
const moment = require('moment')
const AccountModel = require('../../models/AccountModel')
const checkTokenMiddleware = require('../../middlewares/checkTokenMiddleware')

// 记账本的列表
router.get('/account', checkTokenMiddleware, function(req, res, next) {
  console.log(req.userf)
  // 获取所有的账单信息
  AccountModel.find().sort({time: -1}).then(value=>{
    // 成功的提示
    return res.json({
      // 响应编号
      code: '0000',
      // 响应字符串
      msg: '读取成功~',
      // 响应数据
      data: value
    })
  }).catch(err => {
    // 失败的提示
    return res.json({
        // 相应编号
        code: '1001',
        // 响应字符串
        msg: '读取失败~',
        // 响应数据
        data: null
    })
  })
})

// 新增记录
router.post('/account', checkTokenMiddleware, (req, res) => {
  // 插入数据库 
  AccountModel.create({
    ...req.body,
    type: Number(req.body.type),
    // 修改time属性的值
    time: moment(req.body.time).toDate()
  }).then(value => {
    res.json({
        code: '0000',
        msg: '插入成功~',
        data: value
    })
  }).catch(err => {
    res.json({
        code: '1002',
        msg: '插入失败~',
        data: null
    })
  })
});

router.delete('/account/:id', checkTokenMiddleware, (req, res) => {
  // 获取 params 的 id 参数
  let id = req.params.id
  // 删除
  AccountModel.deleteOne({_id: id}).then(value => {
    // 删除完成提示
    res.json({
      code: '0000',
      msg: '删除成功~',
      data: {}
    })
    }).catch(err => {
      res.json({
        code: '1003',
        msg: '删除失败~',
        data: null
      })
  })
})

// 获取单个账单信息
router.get('/account/:id', checkTokenMiddleware, (req, res) => {
    // 获取 params 的 id 参数
    let {id} = req.params
    // 查询 id 参数
    AccountModel.findById(id).then(value => {
      // 查询成功提示
      res.json({
          code: '0000',
          msg: '读取成功~',
          data: value
      })
      }).catch(err => {
        // 查询失败提示
        res.json({
            code: '1004',
            msg: '查询失败~',
            data: null
        })
    })
  })

// 更新单个账单信息
router.patch('/account/:id', checkTokenMiddleware, (req, res) => {
    // 获取 params 的 id 参数
    let {id} = req.params
    // 更新数据库
    AccountModel.updateOne({_id: id},req.body).then(value => {
        // 再次查询
        AccountModel.findById(id).then(value=>{
            res.json({
                code: '0000',
                msg: '更新成功',
                data: value
            })
        }).catch(err => {
            // 查询失败提示
            res.json({
                code: '1004',
                msg: '查询失败~',
                data: null
            })
        })
    }).catch(err => {
        res.json({
            code: '1005',
            msg: '更新失败',
            data: null
        })
    })
})
module.exports = router;
