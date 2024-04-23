const mongoose = require('mongoose')

let bookSchema = new mongoose.Schema({
    name: String,
    author: String,
    price: Number
})

let bookModel = mongoose.model('books',bookSchema)

// 暴露模型对象
module.exports = bookModel