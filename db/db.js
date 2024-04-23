module.exports = function (success, error){
    // error 为可选传递
    if(typeof error !== 'function'){
        error = () => {
            console.log('连接失败~~')
        }
    }
    // 导入mongoose
    const mongoose = require('mongoose')

    // 导入配置文件
    const {DBHOST, DBPORT, DBNAME} = require('../config/config')

    // 连接mongodb 
    mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`)

    // 设置回调 
    mongoose.connection.once('open', () => {
        success()
    })

    // 设置连接错误的回调
    mongoose.connection.on('error', () => {
        error()
    })  

    // 设置关闭的回调
    mongoose.connection.on('close', () => {
        console.log('close~')
    })  
}

