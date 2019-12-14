var mongoose = require("./mongoose")

var Schema = mongoose.Schema

//创建集合
var ArticleListSchema = Schema({
    title: {
        type: String,
        require: true
    },
    author: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    },
    translate: {
        type: String,
        require: true
    },
    reference: {
        type: String,
        require: true
    },
})


module.exports = mongoose.model("ArticleList", ArticleListSchema)