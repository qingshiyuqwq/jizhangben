var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// 导入路由
const indexRouter = require('./routes/web/index');
const authRouter = require('./routes/web/auth');
const accountRouter = require('./routes/api/account');
const authApiRouter = require('./routes/api/auth')


// 导入express-session
const session = require('express-session')
const MongoStore = require('connect-mongo')

// 导入配置项
const {DBHOST, DBPORT, DBNAME} = require('./config/config')

var app = express();
// 设置seesion中间件
app.use(session({
  name: 'sid',    // cookie的name
  secret: 'atguigu',  // 加密字符串
  saveUninitialized: false,   // 是否为每次请求都设置一个cookie
  resave: true,   // 是否每次请求都重新保存session
  store: MongoStore.create({
      mongoUrl: `mongodb://${DBHOST}:${DBPORT}/${DBNAME}`   // 连接数据库
  }),
  cookie: {
      httpOnly: true, // 阻止浏览器前端js访问cookie (document.cookie)
      maxAge: 1000 * 60 * 60 * 24 * 7  // 设置 cookie 和 session 的生命周期
  }

}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/api', accountRouter);
app.use('/api', authApiRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  // 响应404
  res.render('404')
  // next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
