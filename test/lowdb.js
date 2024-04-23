// 导入
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
 
const adapter = new FileSync('db.json')
// 获取db对象
const db = low(adapter)

// 初始化数据
// db.defaults({ posts: [], user: {} }).write()

// 写入数据
// db.get('posts').push({ id: 1, title: '今天天气还不错~' }).write()
// db.get('posts').unshift({ id: 2, title: '今天天气还不错~' }).write()

// 获取单条数据
let res = db.get('posts').find({id:2}).value()
console.log(res)

// 获取数据
// console.log(db.get('posts').value())

// 删除数据
// db.get('posts').remove({id:1}).write()
db.get('posts').remove({id:2}).write()

// 更新数据
// db.get('posts').find({id:2}).assign({title:'摸鱼'}).write()