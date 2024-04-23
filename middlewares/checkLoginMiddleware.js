// 声明中间件检测登录
module.exports = (req, res ,next) => {
    // 判断是否有seesion
    if(!req.session.username){
      return res.redirect('/login')
    }
    next()
}